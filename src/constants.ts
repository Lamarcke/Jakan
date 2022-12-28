import {
    JakanIDResponse,
    JakanQueryResponse,
    JakanSeasonListResponse,
} from "./response/responseTypes";

const BASE_JIKAN_URL = "https://api.jikan.moe/v4/";
const BASE_MAL_URL = "https://api.myanimelist.net/v2/";

type JakanResponse =
    | JakanIDResponse
    | JakanQueryResponse
    | JakanSeasonListResponse;

export { BASE_JIKAN_URL, BASE_MAL_URL };

export type { JakanResponse };
