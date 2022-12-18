import JakanClient from "./clients/base";
import { RedisClientType } from "redis";
import JakanSearch from "./clients/search/search";
import JakanMisc from "./clients/misc/misc";
import JakanUsers from "./clients/users/users";

enum BuilderTargets {
    users = "forUsers",
    search = "forSearch",
    misc = "forMisc",
    undefined = "undefined"
}


type BuilderReturn<T extends JakanClient> = T extends JakanSearch
    ? JakanSearch
    : T extends JakanMisc
    ? JakanMisc
    : T extends JakanUsers
    ? JakanUsers
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
