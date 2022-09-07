import JakanClient from "../base";
import {
    AnimeSearchParameters,
    ExtraAnimeInfo,
    ExtraMangaInfo,
    MangaSearchParameters,
} from "./searchTypes";
import { ExtraInfo, JakanResponse, QueryOrId } from "./searchBases";
import { JakanIDResponse, JakanQueryResponse } from "../response/responseTypes";
import { JakanSearchError } from "../../exceptions";
import { AxiosError } from "axios";

class JakanSearch extends JakanClient {
    anime(id: number, extraInfo: ExtraAnimeInfo): Promise<JakanIDResponse>;
    anime(query: AnimeSearchParameters): Promise<JakanQueryResponse>;
    anime(id: number): Promise<JakanIDResponse>;
    anime(query: string): Promise<JakanQueryResponse>;
    // Searches for an anime using either an id, a query, or a set of parameters.
    async anime(
        queryOrId: QueryOrId<AnimeSearchParameters>,
        extraInfo?: ExtraAnimeInfo
    ): Promise<JakanIDResponse | JakanQueryResponse> {
        return await this._prepareRequest<
            AnimeSearchParameters,
            ExtraAnimeInfo
        >("anime", queryOrId, extraInfo);
    }

    manga(id: number, extraInfo: string): Promise<JakanIDResponse>;
    manga(query: MangaSearchParameters): Promise<JakanQueryResponse>;
    manga(id: number): Promise<JakanIDResponse>;
    manga(query: string): Promise<JakanQueryResponse>;
    // Searches for a manga using either an id, a query, or a set of parameters.
    async manga(
        queryOrId: QueryOrId<MangaSearchParameters>,
        extraInfo?: ExtraMangaInfo
    ): Promise<JakanQueryResponse | JakanIDResponse> {
        return await this._prepareRequest<
            MangaSearchParameters,
            ExtraMangaInfo
        >("manga", queryOrId, extraInfo);
    }

    private async _prepareRequest<
        T extends AnimeSearchParameters | MangaSearchParameters,
        E extends ExtraAnimeInfo | ExtraMangaInfo
    >(
        media: string,
        queryOrId: QueryOrId<T>,
        extraInfo?: ExtraInfo<E>
    ): Promise<JakanIDResponse | JakanQueryResponse> {
        if (typeof queryOrId === "number") {
            return await this._withId(media, queryOrId, extraInfo);
        } else if (
            typeof queryOrId === "string" ||
            typeof queryOrId === "object"
        ) {
            return await this._withQuery(media, queryOrId);
        } else {
            throw new JakanSearchError("No query or ID parameter specified.");
        }
    }

    private async _makeRequest<T extends JakanQueryResponse | JakanIDResponse>(
        request: string
    ): Promise<JakanResponse<T>> {
        try {
            console.log(request);
            const get = await this.axiosInstance.get(request);
            return get.data;
        } catch (e: any | AxiosError) {
            console.error(e);
            if (e.response) {
                throw new JakanSearchError(e.response);
            } else {
                throw new JakanSearchError(
                    "An error unrelated to Jikan happened while making the request."
                );
            }
        }
    }

    private async _withId(
        media: string,
        id: number,
        extraInfo?: string
    ): Promise<JakanIDResponse> {
        let request =
            extraInfo != null
                ? `${media}/${id}/${extraInfo}`
                : `${media}/${id}`;
        return await this._makeRequest<JakanIDResponse>(request);
    }

    private _queryRequestBuilder(
        media: string,
        query: AnimeSearchParameters | MangaSearchParameters
    ): string {
        let request: string = `${media}?`;
        Object.entries(query).forEach(([key, value], index) => {
            const toAppendToRequest =
                index === 0 ? `${key}=${value}` : `&${key}=${value}`;
            request = request + toAppendToRequest;
        });
        return request;
    }

    private async _withQuery(
        media: string,
        query: string | AnimeSearchParameters | MangaSearchParameters
    ): Promise<JakanQueryResponse> {
        let request: string;
        if (typeof query === "object") {
            request = this._queryRequestBuilder(media, query);
        } else {
            request = `${media}?q=${query}`;
        }
        return await this._makeRequest<JakanQueryResponse>(request);
    }
}

export default JakanSearch;
