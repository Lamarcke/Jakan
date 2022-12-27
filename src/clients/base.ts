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
import { JakanError, JakanSettingsError } from "../exceptions";
import { isBrowser, isNode } from "browser-or-node";
import axios, { Axios } from "axios";
import { JakanRequestParameters, JakanResponse } from "../constants";

// This class is responsible for settings up the methods that create a valid axios instance.
class JakanClient {
    private baseURL: string;
    private cacheAge: number | undefined;
    private redisClient: RedisClientType | undefined;
    // trunk-ignore(eslint/@typescript-eslint/no-explicit-any)
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
                    if (result == undefined) {
                        return undefined;
                    }

                    return JSON.parse(result);
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

    /*
     * Builds the query string for requests that use custom queries.
     * For ID requests (e.g. "anime/1"), use "idRequestBuilder".
     * Implemented here because it's used by all clients.
     *
     * @param endpointBase - The base string that represents the target endpoint.
     * This should consist of everything after the base URL and before the query parameters.
     * e.g.: "recommendations/anime", "random/manga" or "anime"
     * This allows us to easily support deep nested endpoints, if Jikan ever implements them.
     * See: https://docs.api.jikan.moe
     *
     * @param query - The query parameters to use.
     *
     * @returns The query string to be used in the request.
     *
     * @example
     * queryRequestBuilder("anime", { q: "naruto" });
     * // Returns "anime?q=naruto"
     * queryRequestBuilder("anime", { q: "naruto", page: 2 });
     * // Returns "anime?q=naruto&page=2"
     * queryRequestBuilder("anime", { id: 1 });
     * // Returns "anime/1"
     */
    queryRequestBuilder(
        endpointBase: string,
        query: JakanRequestParameters
    ): string {
        let request = `${endpointBase}?`;
        if (typeof query === "object") {
            Object.entries(query).forEach(([key, value], index) => {
                const toAppendToRequest =
                    index === 0 ? `${key}=${value}` : `&${key}=${value}`;
                request = request + toAppendToRequest;
            });
        } else if (typeof query === "string") {
            request = request + `q=${query}`;
        } else {
            throw new JakanError(
                "Invalid query runtime type. Only object and string are allowed."
            );
        }
        return request;
    }
    /*
     * Builds the query string for id requests.
     * Used in endpoints like "anime/1", "manga/1" or "anime/1/episodes".
     */
    idRequestBuilder(
        endpointBase: string,
        id: number,
        extraInfo?: string
    ): string {
        if (typeof extraInfo === "string") {
            return `${endpointBase}/${id}/${extraInfo}`;
        } else {
            return `${endpointBase}/${id}`;
        }
    }

    /*
     * Makes the request to Jikan.
     * @param request - The request to make.
     * @returns The response from Jikan.
     * @example
     * makeRequest("anime?q=naruto");
     * // Returns the response from Jikan.
     * makeRequest("anime/1");
     * // Returns the response from Jikan.
     */
    async makeRequest<T extends JakanResponse>(request: string): Promise<T> {
        try {
            const get = await this.axiosInstance.get(request);
            return get.data;

            // trunk-ignore(eslint/@typescript-eslint/no-explicit-any)
        } catch (e: any) {
            if (e.response) {
                throw new JakanError(e.response);
            } else {
                throw new JakanError(
                    "An error unrelated to Jikan happened while making the request: " +
                        e
                );
            }
        }
    }

    setBaseURL(url: string): void {
        this.baseURL = url;
    }

    defineSettings(
        cacheAge?: number,
        redisClient?: RedisClientType,
        // trunk-ignore(eslint/@typescript-eslint/no-explicit-any)
        forage?: any,
        webStorage?: Storage
    ): void {
        this.cacheAge = cacheAge;
        this.redisClient = redisClient;
        this.forage = forage;
        this.webStorage = webStorage;
        // Rebuilds the axios instance with the new settings.
        this._buildAxios();
    }
}

export default JakanClient;
