import { isNode } from "browser-or-node";
import { RedisClientType } from "redis";
import { JakanClientBuilder } from "./builders";
import JakanMisc from "./clients/misc/misc";
import JakanSearch from "./clients/search/search";
import JakanUsers from "./clients/users/users";
import { JakanBuilderError } from "./exceptions";

/*
 * Jakan is the main class of the library.
 * It allows users to easily build a JakanClient.
 * It's also used to specify the cache provider.
 * If no cache provider is specified, defaults to memory.
 */

class Jakan {
    private builder: JakanClientBuilder;

    constructor() {
        this.builder = new JakanClientBuilder();
        // Allows users to easily use the memory cache.
        // Makes calling "withMemory" optional.
        this._setCacheAge();
    }

    private _setCacheAge(cacheAge?: number) {
        if (cacheAge != null) {
            this.builder.setCacheAge(cacheAge);
        }
    }

    forSearch(): JakanSearch {
        this.builder.setForSearch();
        return this.builder.build<JakanSearch>();
    }
    forMisc(): JakanMisc {
        this.builder.setForMisc();
        return this.builder.build<JakanMisc>();
    }

    // Returns a JakanUsers client.
    // You need to register an ClientID to use this. Please check Jakan README for more info.
    forUsers(): JakanUsers {
        this.builder.setForUsers();
        return this.builder.build<JakanUsers>();
    }

    // Builds the JakanSearchClient using a Redis as cache provider.
    //
    // Only works on Node.
    withRedis(redisClient: RedisClientType, cacheAge?: number): Jakan {
        if (isNode) {
            this._setCacheAge(cacheAge);
            this.builder.setRedis(redisClient);
            return this;
        }
        throw new JakanBuilderError("Redis can only be used as cache on Node.");
    }
    // Builds a JikanClient using the localforage library as the storage for request caching.
    // forageInstance refers to a created instance of the localforage library.
    // trunk-ignore(eslint/@typescript-eslint/no-explicit-any)
    withForage(forageInstance: any, cacheAge?: number): Jakan {
        if (!isNode) {
            this._setCacheAge(cacheAge);
            this.builder.setForage(forageInstance);
            return this;
        }

        throw new JakanBuilderError(
            "localForage is only available on the browser."
        );
    }
    // Builds a JikanClient using the WebStorage API as the storage for request caching.
    withWebStorage(webStorage: Storage, cacheAge?: number): Jakan {
        if (!isNode) {
            this._setCacheAge(cacheAge);
            this.builder.setWebStorage(webStorage);
            return this;
        }
        throw new JakanBuilderError(
            "WebStorage API is only available on the browser."
        );
    }

    /**
     * Builds the JakanSearchClient using the memory as storage for request caching.
     *
     * @param {number} [cacheAge] - The age of the cache in milliseconds.
     * @returns The instance of the class.
     */
    withMemory(cacheAge?: number): Jakan {
        this._setCacheAge(cacheAge);
        return this;
    }
}

export { Jakan };
