import {
    AnimeSearchParameters,
    ExtraAnimeInfo,
    ExtraMangaInfo,
    MangaSearchParameters,
    SearchRequestType,
} from "./searchTypes";
import { JakanIDResponse, JakanQueryResponse } from "../response/responseTypes";

type QueryOrId<T extends SearchRequestType> = number | string | T;

type ExtraInfo<T extends ExtraAnimeInfo | ExtraMangaInfo> = T;

type JakanResponse<T extends JakanIDResponse | JakanQueryResponse> =
    T extends JakanQueryResponse ? JakanQueryResponse : JakanIDResponse;

export type { QueryOrId, ExtraInfo, JakanResponse };
