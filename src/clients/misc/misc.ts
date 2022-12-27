import JakanClient from "../base";
import { BASE_JIKAN_URL } from "../../constants";
import {
    JakanIDResponse,
    JakanQueryResponse,
} from "../../response/responseTypes";
import { RandomRequestOptions, RecommendationsRequestQuery } from "./miscTypes";
import { JakanError, JakanMiscError } from "../../exceptions";
import { RecommendationsTargetOptions } from "./miscConstants";

class JakanMisc extends JakanClient {
    /*
     * The implementation for the JakanMisc client.
     * This client is used to access the miscellaneous endpoints of the Jikan API.
     * For example, top, schedules, recommendations, etc.
     * See: https://docs.api.jikan.moe/
     *
     * This client differs from the JakanSearch client in the way that most of the endpoints are unrelated to one another.
     * So it's not viable to implement common functions like "prepareRequest".
     * Rather, each function will have to define it's own request parameters, and query-based functions may use the
     * JakanClient's queryRequestBuilder function.
     */
    constructor() {
        super(BASE_JIKAN_URL);
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
        query?: RecommendationsRequestQuery
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
}

export default JakanMisc;
