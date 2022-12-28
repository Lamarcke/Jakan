import JakanClient from "../base";
import { BASE_JIKAN_URL } from "../../constants";
import {
    JakanIDResponse,
    JakanQueryResponse,
} from "../../response/responseTypes";
import { UsersExtraInfo, UsersQuery } from "./userTypes";
import { AxiosError } from "axios";

// TODO: refactor to use Jikan user endpoints.
class JakanUsers extends JakanClient {
    constructor() {
        super(BASE_JIKAN_URL);
    }

    async users(
        username: string,
        extraInfo?: UsersExtraInfo
    ): Promise<JakanIDResponse> {
        const endpointBase = "users";
        const request = this.infoRequestBuilder(
            endpointBase,
            username,
            extraInfo
        );
        try {
            const get = await this.makeRequest<JakanIDResponse>(request);
            return get;
        } catch (e: unknown) {
            if (e instanceof AxiosError) {
                throw e;
            } else {
                throw new Error(
                    "An error unrelated to Jikan happened while making the request: " +
                        e
                );
            }
        }
    }

    async usersSearch(
        query?: UsersQuery | string | undefined
    ): Promise<JakanQueryResponse> {
        const endpointBase = "users";
        let request = "";
        if (query != undefined) {
            request = this.queryRequestBuilder(endpointBase, query);
        } else {
            request = endpointBase;
        }
        try {
            const get = await this.makeRequest<JakanQueryResponse>(request);
            return get;
        } catch (e: unknown) {
            if (e instanceof AxiosError) {
                throw e;
            } else {
                throw new Error(
                    "An error unrelated to Jikan happened while making the request: " +
                        e
                );
            }
        }
    }
}

export default JakanUsers;
