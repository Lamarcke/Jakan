import { Jakan } from "./jakan";
import JakanSearch from "./clients/search/search";
import JakanUsers from "./clients/users/users";
import JakanMisc from "./clients/misc/misc";
import {
    AnimeSearchParameters,
    MangaSearchParameters,
} from "./clients/search/searchTypes";
import { ExtraAnimeInfo, ExtraMangaInfo } from "./clients/search/searchTypes";

export default Jakan;
export type {
    JakanSearch,
    JakanUsers,
    JakanMisc,
    AnimeSearchParameters,
    MangaSearchParameters,
    ExtraAnimeInfo,
    ExtraMangaInfo,
};
