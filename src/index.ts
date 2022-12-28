import { Jakan } from "./jakan";
import JakanSearch from "./clients/search/search";
import JakanUsers from "./clients/users/users";
import JakanMisc from "./clients/misc/misc";
import { JakanQueryResponse, JakanIDResponse } from "./response/responseTypes";
import {
    AnimeSearchParameters,
    MangaSearchParameters,
    CharacterSearchParameters,
    PeopleSearchParameters,
} from "./clients/search/searchTypes";
import {
    ExtraAnimeInfo,
    ExtraMangaInfo,
    ExtraCharactersInfo,
    ExtraPeopleInfo,
} from "./clients/search/searchTypes";
import { UsersExtraInfo, UsersQuery } from "./clients/users/userTypes";

export default Jakan;
// Client types
export type { JakanSearch, JakanUsers, JakanMisc };
// Search parameters
export type {
    AnimeSearchParameters,
    MangaSearchParameters,
    ExtraAnimeInfo,
    ExtraMangaInfo,
    ExtraCharactersInfo,
    ExtraPeopleInfo,
};
// Misc parameters
export type {};

// User parameters
export type { UsersExtraInfo, UsersQuery };

// Response types
export type { JakanIDResponse, JakanQueryResponse };
