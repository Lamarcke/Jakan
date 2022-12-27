import { BuilderReturn, BuilderTargets, JakanBuilder } from "./generalTypes";
import { JakanBuilderError } from "./exceptions";
import JakanClient from "./clients/base";
import JakanSearch from "./clients/search/search";
import JakanMisc from "./clients/misc/misc";
import { RedisClientType } from "redis";

import JakanUsers from "./clients/users/users";

class JakanClientBuilder implements JakanBuilder {
    private redisClient: RedisClientType | undefined = undefined;
    private cacheAge: number = 15 * 60 * 1000;
    private forage: any | undefined;
    private webStorage: Storage | undefined;
    // Use BuilderTargets enum to access this object keys.
    private builderTarget: BuilderTargets;
    private _clientID?: string;

    constructor() {
        this.builderTarget = BuilderTargets.undefined;
    }

    setForUsers(clientID: string): JakanClientBuilder {
        if (clientID) {
            this.builderTarget = BuilderTargets.users;
            this._clientID = clientID;
        } else {
            throw new JakanBuilderError("No clientID specified.");
        }
        return this;
    }

    setForSearch(): JakanClientBuilder {
        this.builderTarget = BuilderTargets.search;
        return this;
    }

    setForMisc(): JakanClientBuilder {
        this.builderTarget = BuilderTargets.misc;
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
        let instance: JakanClient;

        if (this.builderTarget === BuilderTargets.search) {
            instance = new JakanSearch();
        } else if (this.builderTarget === BuilderTargets.misc) {
            instance = new JakanMisc();
        } else if (this.builderTarget === BuilderTargets.users) {
            if (this._clientID == undefined) {
                throw new JakanBuilderError("No clientID specified.");
            }
            instance = new JakanUsers(this._clientID);
        } else {
            throw new JakanBuilderError("No build target selected");
        }

        instance.defineSettings(
            this.cacheAge,
            this.redisClient,
            this.forage,
            this.webStorage
        );

        return instance as BuilderReturn<T>;
    }
}

export { JakanClientBuilder };
