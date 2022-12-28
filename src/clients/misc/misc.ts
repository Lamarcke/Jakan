import JakanClient from "../base";
import { BASE_JIKAN_URL } from "../../constants";
import {
    JakanIDResponse,
    JakanQueryResponse,
    JakanSeasonListResponse,
} from "../../response/responseTypes";
import {
    GenresQuery,
    RandomRequestOptions,
    RecommendationsQueryOptions,
    ScheduleQuery,
    SeasonListQuery,
    SeasonListRequestWhen,
    SeasonQuery,
    TopRequestQuery,
} from "./miscTypes";
import { JakanError, JakanMiscError } from "../../exceptions";
import {
    RecommendationsTargetOptions,
    TopRequestOptions,
} from "./miscConstants";

/*
 * TODO:
 * - [ ] Add support for the following endpoints:
 * - [x] /reviews
 * - [ ] /genres
 *
 */

class JakanMisc extends JakanClient {
    /*
     * The implementation for the JakanMisc client.
     * This client is used to access the miscellaneous endpoints of the Jikan API.
     * For example, top, schedules, recommendations, etc.
     * See: https://docs.api.jikan.moe/
     */
    constructor() {
        super(BASE_JIKAN_URL);
    }

    // A short-hand function to handle requests that may or not have query parameters
    private prepareQueryRequest(endpointBase: string, query?: object): string {
        let requestStr = "";
        if (query != undefined && typeof query == "object") {
            requestStr = this.queryRequestBuilder(endpointBase, query);
        } else {
            requestStr = endpointBase;
        }
        return requestStr;
    }

    async random(target: RandomRequestOptions): Promise<JakanIDResponse> {
        const request = `random/${target}`;
        try {
            const get = await this.makeRequest<JakanIDResponse>(request);
            return get;
        } catch (e: unknown) {
            if (e instanceof JakanError) {
                throw new JakanMiscError(e.message);
            } else {
                throw new JakanMiscError(
                    "An error unrelated to Jikan happened while making the request: " +
                        e
                );
            }
        }
    }

    async recommendations(
        media: keyof typeof RecommendationsTargetOptions,
        query?: RecommendationsQueryOptions
    ): Promise<JakanQueryResponse> {
        const endpointBase = `recommendations/${media}`;
        let request = "";
        if (query != undefined && typeof query == "object") {
            request = this.queryRequestBuilder(endpointBase, query);
        } else {
            request = endpointBase;
        }

        try {
            const get = await this.makeRequest<JakanQueryResponse>(request);
            return get;
        } catch (e: unknown) {
            if (e instanceof JakanError) {
                throw new JakanMiscError(e.message);
            } else {
                throw new JakanMiscError(
                    "An error unrelated to Jikan happened while making the request: " +
                        e
                );
            }
        }
    }

    async reviews(media: "anime" | "manga"): Promise<JakanQueryResponse> {
        const request = `reviews/${media}`;
        try {
            const get = await this.makeRequest<JakanQueryResponse>(request);
            return get;
        } catch (e: unknown) {
            if (e instanceof JakanError) {
                throw new JakanMiscError(e.message);
            } else {
                throw new JakanMiscError(
                    "An error unrelated to Jikan happened while making the request: " +
                        e
                );
            }
        }
    }

    async genres(media: "anime" | "manga", query?: GenresQuery){
        const endpointBase = `genres/${media}`;
        const request = this.prepareQueryRequest(endpointBase, query);
        try {
            const get = await this.makeRequest<JakanQueryResponse>(request);
            return get;
        } catch (e: unknown) {
            if (e instanceof JakanError) {
                throw new JakanMiscError(e.message);
            } else {
                throw new JakanMiscError(
                    "An error unrelated to Jikan happened while making the request: " +
                        e
                );
            }
        }
    }

    async top(
        media: keyof typeof TopRequestOptions,
        query?: TopRequestQuery
    ): Promise<JakanQueryResponse> {
        const endpointBase = `top/${media}`;
        const request = this.prepareQueryRequest(endpointBase, query);

        try {
            const get = await this.makeRequest<JakanQueryResponse>(request);
            return get;
        } catch (e: unknown) {
            if (e instanceof JakanError) {
                throw new JakanMiscError(e.message);
            } else {
                throw new JakanMiscError(
                    "An error unrelated to Jikan happened while making the request: " +
                        e
                );
            }
        }
    }

    async schedule(query: ScheduleQuery): Promise<JakanQueryResponse> {
        const endpointBase = "schedules";
        const request = this.prepareQueryRequest(endpointBase, query);

        try {
            const get = await this.makeRequest<JakanQueryResponse>(request);
            return get;
        } catch (e: unknown) {
            if (e instanceof JakanError) {
                throw new JakanMiscError(e.message);
            } else {
                throw new JakanMiscError(
                    "An error unrelated to Jikan happened while making the request: " +
                        e
                );
            }
        }
    }

    async season(
        year: number,
        season: string,
        query?: SeasonQuery
    ): Promise<JakanQueryResponse> {
        if (year == undefined || season == undefined) {
            throw new JakanMiscError(
                "Year and season parameters are mandatory for this request."
            );
        }
        const endpointBase = `seasons/${year}/${season}`;
        const request = this.prepareQueryRequest(endpointBase, query);
        try {
            const get = await this.makeRequest<JakanQueryResponse>(request);
            return get;
        } catch (e: unknown) {
            if (e instanceof JakanError) {
                throw new JakanMiscError(e.message);
            } else {
                throw new JakanMiscError(
                    "An error unrelated to Jikan happened while making the request: " +
                        e
                );
            }
        }
    }
    /*
     * This function is a bit different from the others, mainly because the
     * /seasons endpoint is one of the few that have "data" as an array, but has no pagination info.
     */
    seasonList(
        when: SeasonListRequestWhen,
        query: SeasonListQuery
    ): Promise<JakanQueryResponse>;
    seasonList(when: SeasonListRequestWhen): Promise<JakanQueryResponse>;
    seasonList(): Promise<JakanSeasonListResponse>;
    async seasonList(
        when?: SeasonListRequestWhen,
        query?: SeasonListQuery
    ): Promise<JakanQueryResponse | JakanSeasonListResponse> {
        let request = "";
        if (when != undefined && typeof when == "string") {
            const endpointBase = `seasons/${when}`;
            // This function will automatically determine if query is undefined or not.
            request = this.prepareQueryRequest(endpointBase, query);
        } else {
            request = "seasons";
        }

        try {
            const get = await this.makeRequest<
                JakanQueryResponse | JakanSeasonListResponse
            >(request);
            return get;
        } catch (e: unknown) {
            if (e instanceof JakanError) {
                throw new JakanMiscError(e.message);
            } else {
                throw new JakanMiscError(
                    "An error unrelated to Jikan happened while making the request: " +
                        e
                );
            }
        }
    }
}

export default JakanMisc;
