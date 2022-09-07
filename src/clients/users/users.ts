import JakanClient from "../base";
import { AxiosRequestHeaders } from "axios";
import JakanUsersResponse from "./userTypes";

// A client responsible for communication with MAL official API for user related requests.
// Please read the Jakan README for more info on how this works.
class JakanUsers extends JakanClient {
    private readonly clientID: string;
    private readonly requestHeaders: AxiosRequestHeaders;

    constructor(baseURL: string, clientID: string) {
        super(baseURL);
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
        } catch (e: any) {
            console.error(e);
            throw new Error();
        }
    }
    // Retrieves the public manga list of a specified user.
    // Next is an url specified by MAL that represents the next page in this user's manga list.

    async userManga(username: string): Promise<JakanUsersResponse> {
        const request = `users/${username}/mangalist`;
        try {
            const get = await this.axiosInstance.get<JakanUsersResponse>(
                request,
                {
                    headers: this.requestHeaders,
                }
            );
            return get.data;
        } catch (e: any) {
            console.error(e);
            throw new Error();
        }
    }
}

export default JakanUsers;
