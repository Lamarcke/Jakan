import {
    buildStorage,
    AxiosStorage,
    StorageValue,
    buildWebStorage,
    buildMemoryStorage,
    setupCache,
} from "axios-cache-interceptor";
import localforage from "localforage";
import { RedisClientType } from "redis";
import { JakanSettingsError } from "../exceptions";
import { isBrowser, isNode } from "browser-or-node";
import axios, { Axios } from "axios";

// This class is responsible for settings up the methods that create a valid axios instance.
class JakanClient {
    private baseURL: string;
    private isCacheOff: boolean = false;
    private cacheAge: number | undefined;
    private redisClient: RedisClientType | undefined;
    private forage: any | undefined;
    private webStorage: Storage | undefined;
    protected axiosInstance!: Axios;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
        this._buildAxios();
    }

    // Builds the AxioStorage to be used by caching in axios-cache-interceptor using Redis.
    private _buildRedisStorage() {
        if (!isNode) {
            throw new JakanSettingsError("Redis is only avaible on Node.");
        }
        const client = this.redisClient;
        if (client) {
            return buildStorage({
                async find(key) {
                    const result = await client.get(`axios-cache:${key}`);
                    return JSON.parse(result!);
                },
                async set(key, value) {
                    await client.set(
                        `axios-cache:${key}`,
                        JSON.stringify(value)
                    );
                },
                async remove(value) {
                    await client.del(`axios-cache:${value}`);
                },
            });
        }
        throw new JakanSettingsError("No redis client specified.");
    }
    // Builds the AxioStorage to be used by caching in axios-cache-interceptor using localForage.
    private _buildForageStorage() {
        if (!isBrowser) {
            throw new JakanSettingsError(
                "localForage is only available on the browser."
            );
        }
        if (this.forage) {
            const client = localforage.createInstance({});
            return buildStorage({
                async find(key) {
                    const result = await client.getItem<StorageValue | null>(
                        `axios-cache:${key}`
                    );
                    if (result == null) {
                        return undefined;
                    }
                    return result;
                },
                async set(key, value) {
                    await client.setItem(key, value);
                },
                async remove(key) {
                    await client.removeItem(`axios-cache:${key}`);
                },
            });
        }
        throw new JakanSettingsError("No localForage instance provided.");
    }

    private _buildAxios(): void {
        const baseAxios = axios.create({ baseURL: this.baseURL });
        if (this.isCacheOff) {
            this.axiosInstance = baseAxios;
            return;
        }
        let storage: AxiosStorage;
        if (this.redisClient) {
            storage = this._buildRedisStorage();
        } else if (this.forage) {
            storage = this._buildForageStorage();
        } else if (this.webStorage) {
            storage = buildWebStorage(this.webStorage, "axios-cache:");
        } else {
            storage = buildMemoryStorage();
        }

        this.axiosInstance = setupCache(baseAxios, { storage: storage });
    }

    setBaseURL(url: string): void {
        this.baseURL = url;
    }

    settings(
        cacheOff?: boolean,
        cacheAge?: number,
        redisClient?: RedisClientType,
        forage?: any,
        webStorage?: Storage
    ): void {
        if (cacheOff) {
            this.isCacheOff = true;
        } else {
            this.cacheAge = cacheAge;
            this.redisClient = redisClient;
            this.forage = forage;
            this.webStorage = webStorage;
        }

        this._buildAxios();
    }
}

export default JakanClient;
