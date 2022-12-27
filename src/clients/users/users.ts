import JakanClient from "../base";
import { AxiosRequestHeaders } from "axios";
import JakanUsersResponse from "./userTypes";
import { JakanUsersError } from "../../exceptions";
import { BASE_MAL_URL } from "../../constants";

// A client responsible for communication with MAL official API for user related requests.
// Please read the Jakan README for more info on how this works.
class JakanUsers extends JakanClient {
    // TODO: Refactor to use Jikan's API native user endpoints.
    private readonly clientID: string;
    private readonly requestHeaders: AxiosRequestHeaders;

    constructor(clientID: string) {
        super(BASE_MAL_URL);
        this.clientID = clientID;
        this.requestHeaders = {
            "X-MAL-CLIENT-ID": this.clientID,
        };
    }
    // Retrieves the public anime list of a specified user.
    // Next is an url specified by MAL that represents the next page in this user's anime list.
    async userAnime(
        username: string,
        next?: string
    ): Promise<JakanUsersResponse> {
        const request = next ? next : `users/${username}/animelist`;
        try {
            const get = await this.axiosInstance.get<JakanUsersResponse>(
                request,
                {
                    headers: this.requestHeaders,
                }
            );
            return get.data;

            // trunk-ignore(eslint/@typescript-eslint/no-explicit-any)
        } catch (e: any) {
            throw new Error();
        }
    }
    // Retrieves the public manga list of a specified user.
    // Next is an url specified by MAL that represents the next page in this user's manga list.

    async userManga(
        username: string,
        next?: string
    ): Promise<JakanUsersResponse> {
        const request = next ? next : `users/${username}/animelist`;
        try {
            const get = await this.axiosInstance.get<JakanUsersResponse>(
                request,
                {
                    headers: this.requestHeaders,
                }
            );
            return get.data;
            // trunk-ignore(eslint/@typescript-eslint/no-explicit-any)
        } catch (e: any) {
            throw new JakanUsersError(e);
        }
    }
}

export default JakanUsers;
