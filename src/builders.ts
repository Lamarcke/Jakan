import { BuilderTarget, BuilderTargets, JakanBuilder } from "./generalTypes";
import { JakanBuilderError } from "./exceptions";
import JakanClient from "./clients/base";
import JakanSearch from "./clients/search";
import JakanMisc from "./clients/misc";
import { RedisClientType } from "redis";
import { BASE_JIKAN_URL, BASE_MAL_URL } from "./constants";
import { key } from "localforage";
import JakanUsers from "./clients/users";

class JakanClientBuilder implements JakanBuilder {
    private redisClient: RedisClientType | undefined = undefined;
    private cacheAge: number = 15 * 60 * 1000;
    private forage: any | undefined;
    private webStorage: Storage | undefined;
    // Use BuilderTargets enum to access this object keys.
    private builderTarget: BuilderTarget = {
        forUsers: false,
        forMisc: false,
        forSearch: false,
    };

    constructor() {}

    private _setBuilderOptions(valueName: BuilderTargets) {
        if (valueName) {
            // This iterates through the builderOptions and sets
            Object.keys(this.builderTarget).forEach((key) => {
                if (key === valueName) {
                    this.builderTarget[valueName] = true;
                } else {
                    this.builderTarget[key] = false;
                }
            });
        }
    }

    setForUsers(forUsers: boolean): JakanClientBuilder {
        if (forUsers) {
            this._setBuilderOptions(BuilderTargets.users);
        }
        return this;
    }

    setForSearch(forSearch: boolean): JakanClientBuilder {
        if (forSearch) {
            this._setBuilderOptions(BuilderTargets.search);
        }
        return this;
    }

    setForMisc(forMisc: boolean): JakanClientBuilder {
        if (forMisc) {
            this._setBuilderOptions(BuilderTargets.misc);
        }
        return this;
    }

    setCacheAge(maxAge: number): JakanBuilder {
        this.cacheAge = maxAge;
        return this;
    }

    setRedis(redis: RedisClientType): JakanBuilder {
        this.redisClient = redis;
        return this;
    }

    setWebStorage(value: Storage) {
        this.webStorage = value;
    }

    setForage(value: any) {
        this.forage = value;
    }

    // Builds the JikanClient based on specified values. All clients inherit from JikanClient.
    build(): JakanClient {
        const builderTargetValues = Object.values(this.builderTarget);
        const activeValues = builderTargetValues.filter(
            (keyValue) => keyValue === true
        );
        if (activeValues.length > 1) {
            throw new JakanBuilderError("Only one client may be targeted.");
        }

        if (activeValues.length > 1) {
            let instance: JakanClient;
            const cacheOff = this.builderTarget[BuilderTargets.users];
            if (this.builderTarget[BuilderTargets.search]) {
                instance = new JakanSearch(BASE_JIKAN_URL);
            } else if (this.builderTarget[BuilderTargets.misc]) {
                instance = new JakanMisc(BASE_JIKAN_URL);
            } else if (this.builderTarget[BuilderTargets.users]) {
                instance = new JakanUsers(BASE_MAL_URL);
            } else {
                throw new JakanBuilderError("No build target selected");
            }
            instance.settings(
                cacheOff,
                this.cacheAge,
                this.redisClient,
                this.forage,
                this.webStorage
            );
            return instance;
        } else {
            throw new JakanBuilderError("No media type specified.");
        }
    }
}

export { JakanClientBuilder };
