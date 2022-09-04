import { RedisStore } from "axios-cache-adapter";
import { JikanClient, MALClient } from "./jakan";

enum ClientOptions {
    jikan = "Jikan",
}

enum MediaOptions {
    anime = "anime",
    manga = "manga",
    characters = "characters",
}

interface JakanBuilder {
    setMedia?(media: MediaOptions): void;

    setCacheAge?(maxAge: number): void;

    setRedis?(redis: RedisStore): void;

    build(): JikanClient | MALClient;
}

export { ClientOptions, MediaOptions };
export type { JakanBuilder };
