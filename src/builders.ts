import { BuilderReturn, BuilderTargets, JakanBuilder } from "./generalTypes";
import { JakanBuilderError } from "./exceptions";
import JakanClient from "./clients/base";
import JakanSearch from "./clients/search/search";
import JakanMisc from "./clients/misc/misc";
import { RedisClientType } from "redis";

import JakanUsers from "./clients/users/users";
import { type } from "os";

class JakanClientBuilder implements JakanBuilder {
    private redisClient: RedisClientType | undefined;
    // 15 minutes
    private cacheAge: number = 15 * 60 * 1000;
    private forage: unknown | undefined;
    private webStorage: Storage | undefined;
    private builderTarget: BuilderTargets | undefined;

    setForUsers(): JakanClientBuilder {
        this.builderTarget = BuilderTargets.users;
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
        if (typeof maxAge === "number") {
            this.cacheAge = maxAge;
        }

        return this;
    }

    setRedis(redis: RedisClientType): JakanBuilder {
        if (redis == undefined) {
            throw new JakanBuilderError(
                "Redis instance is undefined. Aborting to avoid cache errors."
            );
        }
        this.redisClient = redis;
        return this;
    }

    setWebStorage(webStorage: Storage) {
        if (webStorage == undefined) {
            throw new JakanBuilderError(
                "WebStorage instance is undefined. Aborting to avoid cache errors."
            );
        }
        this.webStorage = webStorage;
    }

    setForage(forage: unknown) {
        if (forage == undefined) {
            throw new JakanBuilderError(
                "Forage instance is undefined. Aborting to avoid cache errors."
            );
        }
        this.forage = forage;
    }

    // Builds the JikanClient based on specified values. All clients inherit from JikanClient.
    build<T extends JakanClient>(): BuilderReturn<T> {
        let instance: JakanClient;

        if (this.builderTarget === BuilderTargets.search) {
            instance = new JakanSearch();
        } else if (this.builderTarget === BuilderTargets.misc) {
            instance = new JakanMisc();
        } else if (this.builderTarget === BuilderTargets.users) {
            // Disable cache for the user client.
            instance = new JakanUsers();
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
