import JakanClient from "../base";
import {
    QueryOrId,
    AnimeSearchParameters,
    CharacterSearchParameters,
    PeopleSearchParameters,
    ExtraAnimeInfo,
    ExtraMangaInfo,
    MangaSearchParameters,
    SearchRequestParameters,
    SearchRequestExtraInfo,
    ExtraCharactersInfo,
    ExtraPeopleInfo,
    JakanResponse,
    ExtraInfo,
} from "./searchTypes";
import { JakanIDResponse, JakanQueryResponse } from "../response/responseTypes";
import { JakanSearchError } from "../../exceptions";
import { SearchMediaOptions } from "./searchConstants";

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
        >(SearchMediaOptions.anime, queryOrId, extraInfo);
    }

    manga(id: number, extraInfo: ExtraMangaInfo): Promise<JakanIDResponse>;
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
        >(SearchMediaOptions.manga, queryOrId, extraInfo);
    }

    characters(
        id: number,
        extraInfo: ExtraCharactersInfo
    ): Promise<JakanIDResponse>;
    characters(query: CharacterSearchParameters): Promise<JakanQueryResponse>;
    characters(id: number): Promise<JakanIDResponse>;
    characters(query: string): Promise<JakanQueryResponse>;
    async characters(
        queryOrId: QueryOrId<CharacterSearchParameters>,
        extraInfo?: ExtraCharactersInfo
    ): Promise<JakanQueryResponse | JakanIDResponse> {
        return await this._prepareRequest<
            CharacterSearchParameters,
            ExtraCharactersInfo
        >(SearchMediaOptions.characters, queryOrId, extraInfo);
    }

    people(id: number, extraInfo: ExtraPeopleInfo): Promise<JakanIDResponse>;
    people(query: PeopleSearchParameters): Promise<JakanQueryResponse>;
    people(id: number): Promise<JakanIDResponse>;
    people(query: string): Promise<JakanQueryResponse>;
    async people(
        queryOrId: QueryOrId<PeopleSearchParameters>,
        extraInfo?: ExtraPeopleInfo
    ): Promise<JakanQueryResponse | JakanIDResponse> {
        return await this._prepareRequest<
            PeopleSearchParameters,
            ExtraPeopleInfo
        >(SearchMediaOptions.people, queryOrId, extraInfo);
    }

    private async _prepareRequest<
        T extends SearchRequestParameters,
        E extends SearchRequestExtraInfo
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
            const get = await this.axiosInstance.get(request);
            return get.data;

            // trunk-ignore(eslint/@typescript-eslint/no-explicit-any)
        } catch (e: any) {
            // @eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        const request =
            extraInfo != null
                ? `${media}/${id}/${extraInfo}`
                : `${media}/${id}`;
        return await this._makeRequest<JakanIDResponse>(request);
    }

    private _queryRequestBuilder(
        media: string,
        query: SearchRequestParameters
    ): string {
        let request = `${media}?`;
        if (typeof query === "object") {
            Object.entries(query).forEach(([key, value], index) => {
                const toAppendToRequest =
                    index === 0 ? `${key}=${value}` : `&${key}=${value}`;
                request = request + toAppendToRequest;
            });
        } else {
            request = request + `q=${query}`;
        }
        return request;
    }

    private async _withQuery(
        media: string,
        query: SearchRequestParameters
    ): Promise<JakanQueryResponse> {
        const request = this._queryRequestBuilder(media, query);
        return await this._makeRequest<JakanQueryResponse>(request);
    }
}

export default JakanSearch;
