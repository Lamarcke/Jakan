import { RedisStore } from "axios-cache-adapter";
import { ClientOptions, MediaOptions } from "./types";

// Responsible for search and etc. on anime, manga and other media types.
class JikanClient {
    private media: MediaOptions;
    private readonly cacheAge: number | undefined;
    private readonly redisClient: RedisStore | undefined;
    private readonly client: ClientOptions;
    constructor(
        media: MediaOptions,
        client: ClientOptions,
        cacheAge?: number,
        redisClient?: RedisStore
    ) {
        this.media = media;
        this.cacheAge = cacheAge;
        this.redisClient = redisClient;
        this.client = client;
    }
}

// Responsible for user auth and library handling.
class MALClient {}

export { JikanClient, MALClient };
