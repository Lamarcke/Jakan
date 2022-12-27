import { MiscRequestParameters } from "./clients/misc/miscTypes";
import { SearchRequestParameters } from "./clients/search/searchTypes";
import { JakanIDResponse, JakanQueryResponse } from "./response/responseTypes";

const BASE_JIKAN_URL = "https://api.jikan.moe/v4/";
const BASE_MAL_URL = "https://api.myanimelist.net/v2/";

type JakanResponse = JakanIDResponse | JakanQueryResponse;

type JakanRequestParameters = SearchRequestParameters | MiscRequestParameters;

export { BASE_JIKAN_URL, BASE_MAL_URL };

export type { JakanRequestParameters, JakanResponse };
