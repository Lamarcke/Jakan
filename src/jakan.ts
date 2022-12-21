import { isNode } from "browser-or-node";
import { RedisClientType } from "redis";
import { JakanClientBuilder } from "./builders";
import JakanMisc from "./clients/misc/misc";
import JakanSearch from "./clients/search/search";
import JakanUsers from "./clients/users/users";
import { JakanBuilderError } from "./exceptions";
import { BuilderTargets } from "./generalTypes";

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
    forSearch(): JakanSearch {
        this.builder.setForSearch();
        return this.builder.build<JakanSearch>();
    }

    // Builds the client for searching schedules, recommendations and
    // everything not directly related to anime/manga/characters/people search.
    forMisc(): JakanMisc {
        this.builder.setForMisc();
        return this.builder.build<JakanMisc>();
    }

    // Returns a JakanUsers client. Won't cache requests.
    // You need to register an ClientID to use this. Please check Jakan README for more info.
    forUsers(clientID: string): JakanUsers {
        this.builder.setForUsers(clientID);
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
    // Builds a JikanClient using the localForage as the storage for request caching.
    // forageInstance is a created instance of the localforage library.
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

    // Builds the JakanSearchClient using the memory as storage for request caching.
    withMemory(cacheAge?: number): Jakan {
        this._setCacheAge(cacheAge);
        return this;
    }
}

export { Jakan };
