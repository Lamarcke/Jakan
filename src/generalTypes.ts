import JakanClient from "./clients/base";
import { RedisClientType } from "redis";

enum BuilderTargets {
    users = "forUsers",
    search = "forSearch",
    misc = "forMisc",
    undefined = "undefined",
}

type BuilderReturn<T extends JakanClient> = T extends JakanClient
    ? T
    : JakanClient;

interface JakanBuilder {
    setForUsers(clientID: string): JakanBuilder;

    setForSearch(forSearch: boolean): JakanBuilder;

    setForMisc(forMisc: boolean): JakanBuilder;

    setCacheAge(maxAge: number): JakanBuilder;

    setRedis(redis: RedisClientType): JakanBuilder;

    build(target: string): JakanClient;
}

export { BuilderTargets };
export type { JakanBuilder, BuilderReturn };
