import { ClientOptions, JakanBuilder, MediaOptions } from "./types";
import { RedisStore } from "axios-cache-adapter";
import { JikanClient, MALClient } from "./jakan";
import { JakanBuilderError } from "./exceptions";

class JikanClientBuilder implements JakanBuilder {
    private media: MediaOptions | undefined;
    private redisClient: undefined | RedisStore = undefined;
    private client: ClientOptions = ClientOptions.jikan;
    private cacheAge: number = 15 * 60 * 1000;

    constructor() {}

    setMedia(media: MediaOptions) {}

    setCacheAge(maxAge: number): void {
        this.cacheAge = maxAge;
    }

    setRedis(redis: RedisStore): void {
        this.redisClient = redis;
    }

    build(): JikanClient {
        if (this.media == null) {
            throw new JakanBuilderError("Media parameter unset");
        }
        return new JikanClient(
            this.media,
            this.client,
            this.cacheAge,
            this.redisClient
        );
    }
}

class MALClientBuilder implements JakanBuilder {
    build(): MALClient {
        return new MALClient();
    }
}

// Main class for building, acts as a Director.
class Jakan {
    private jikanBuilder: JikanClientBuilder = new JikanClientBuilder();

    constructor() {}

    public forAnime(): void {}

    public forManga(): void {}

    public forCharacters(): void {}

    public forUsers(): void {}

    // Builds the JikanClient using a Redis as cache provider.
    public withRedis(redisClient: RedisStore, cacheAge?: number): void {}

    // Builds the JikanClient using the memory as cache provider.
    public withMemory(cacheAge?: number): void {}
}

export { JikanClientBuilder, MALClientBuilder, Jakan };
