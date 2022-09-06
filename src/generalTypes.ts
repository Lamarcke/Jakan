import JakanClient from "./clients/base";
import { RedisClientType } from "redis";

enum MediaSearchOptions {
    anime = "anime",
    manga = "manga",
    characters = "characters",
}

enum MiscSearchOptions {}

enum BuilderTargets {
    users = "forUsers",
    search = "forSearch",
    misc = "forMisc",
}

type BuilderTarget = {
    [key: string]: boolean;
    forUsers: boolean;
    forSearch: boolean;
    forMisc: boolean;
};

interface JakanBuilder {
    setForUsers(forUsers: boolean): JakanBuilder;

    setForSearch(forSearch: boolean): JakanBuilder;

    setForMisc(forMisc: boolean): JakanBuilder;

    setCacheAge(maxAge: number): JakanBuilder;

    setRedis(redis: RedisClientType): JakanBuilder;

    build(): JakanClient;
}

export { MediaSearchOptions, MiscSearchOptions, BuilderTargets };
export type { JakanBuilder, BuilderTarget };
