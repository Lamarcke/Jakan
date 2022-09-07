import { JakanBuilderError } from "./exceptions";
import { JakanClientBuilder } from "./builders";
import { RedisClientType } from "redis";
import { isNode } from "browser-or-node";
import JakanUsers from "./clients/users/users";
import { BuilderReturn, BuilderTargets } from "./generalTypes";
import JakanSearch from "./clients/search/search";
import JakanMisc from "./clients/misc/misc";
import JakanClient from "./clients/base";

// Configures Jakan caching and returns a JakanClient.
class Jakan {
    private builder: JakanClientBuilder;

    constructor() {
        this.builder = new JakanClientBuilder();
    }

    private _setCacheAge(cacheAge?: number) {
        if (cacheAge != null) {
            this.builder.setCacheAge(cacheAge);
        }
    }

    // Builds the client for searching for everything related with anime, manga, characters and people.
    forSearch(): Jakan {
        this.builder.setForSearch(true);
        return this;
    }

    // Builds the client for searching schedules, recommendations and
    // everything not directly related to anime/manga/characters/people search.
    forMisc(): Jakan {
        this.builder.setForMisc(true);
        return this;
    }

    // Returns a JakanUsers client directly. Won't cache requests.
    // You need to register an ClientID to use this. Please check Jakan README for more info.
    forUsers(clientID: string): Jakan {
        this.builder.setForUsers(clientID);
        return this;
    }

    // Builds the JakanSearchClient using a Redis as cache provider.
    //
    // Only works on Node.
    withRedis<T extends JakanClient>(
        redisClient: RedisClientType,
        cacheAge?: number
    ): BuilderReturn<T> {
        if (isNode) {
            this._setCacheAge(cacheAge);
            this.builder.setRedis(redisClient);
            return this.builder.build<T>();
        }
        throw new JakanBuilderError("Redis can only be used as cache on Node.");
    }
    // Builds a JikanClient using the localForage as the storage for request caching.
    // forageInstance is a created instance of the localforage library.
    withForage<T extends JakanClient>(
        forageInstance: any,
        cacheAge?: number
    ): BuilderReturn<T> {
        if (!isNode) {
            this._setCacheAge(cacheAge);
            this.builder.setForage(forageInstance);
            return this.builder.build<T>();
        }
        throw new JakanBuilderError(
            "localForage is only available on the browser."
        );
    }
    // Builds a JikanClient using the WebStorage API as the storage for request caching.
    withWebStorage<T extends JakanClient>(
        webStorage: Storage,
        cacheAge?: number
    ): BuilderReturn<T> {
        if (!isNode) {
            this._setCacheAge(cacheAge);
            this.builder.setWebStorage(webStorage);
            return this.builder.build<T>();
        }
        throw new JakanBuilderError(
            "WebStorage API is only available on the browser."
        );
    }

    // Builds the JakanSearchClient using the memory as storage for request caching.
    withMemory<T extends JakanClient>(cacheAge?: number): BuilderReturn<T> {
        this._setCacheAge(cacheAge);
        return this.builder.build<T>();
    }
}

export { Jakan };
