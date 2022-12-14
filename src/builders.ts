import {
    BuilderReturn,
    BuilderTargetObject,
    BuilderTargets,
    JakanBuilder,
} from "./generalTypes";
import { JakanBuilderError } from "./exceptions";
import JakanClient from "./clients/base";
import JakanSearch from "./clients/search/search";
import JakanMisc from "./clients/misc/misc";
import { RedisClientType } from "redis";
import { BASE_JIKAN_URL, BASE_MAL_URL } from "./constants";
import JakanUsers from "./clients/users/users";

class JakanClientBuilder implements JakanBuilder {
    private redisClient: RedisClientType | undefined = undefined;
    private cacheAge: number = 15 * 60 * 1000;
    private forage: any | undefined;
    private webStorage: Storage | undefined;
    // Use BuilderTargets enum to access this object keys.
    private builderTarget: BuilderTargetObject = {
        forUsers: false,
        forMisc: false,
        forSearch: false,
    };
    private _clientID?: string;

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

    setForUsers(clientID: string): JakanClientBuilder {
        if (clientID) {
            this._setBuilderOptions(BuilderTargets.users);
            this._clientID = clientID;
        } else {
            throw new JakanBuilderError("No clientID specified.");
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
    build<T extends JakanClient>(): BuilderReturn<T> {
        const builderTargetValues = Object.values(this.builderTarget);
        const activeValues = builderTargetValues.filter(
            (keyValue) => keyValue === true
        );
        if (activeValues.length > 1) {
            throw new JakanBuilderError("Only one client may be targeted.");
        }

        if (activeValues.length > 0) {
            let instance: JakanUsers | JakanSearch | JakanMisc;
            if (this.builderTarget.forSearch) {
                instance = new JakanSearch(BASE_JIKAN_URL);
            } else if (this.builderTarget.forMisc) {
                instance = new JakanMisc(BASE_JIKAN_URL, "");
            } else if (this.builderTarget.forUsers && this._clientID) {
                instance = new JakanUsers(BASE_MAL_URL, this._clientID);
            } else {
                throw new JakanBuilderError("No build target selected");
            }
            instance.settings(
                this.cacheAge,
                this.redisClient,
                this.forage,
                this.webStorage
            );
            // @ts-ignore
            return instance;
        } else {
            throw new JakanBuilderError("No media type specified.");
        }
    }
}

export { JakanClientBuilder };
