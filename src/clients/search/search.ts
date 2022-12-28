import JakanClient from "../base";
import {
    QueryOrId,
    AnimeSearchParameters,
    CharacterSearchParameters,
    PeopleSearchParameters,
    ExtraAnimeInfo,
    ExtraMangaInfo,
    MangaSearchParameters,
    ExtraCharactersInfo,
    ExtraPeopleInfo,
    ExtraInfo,
} from "./searchTypes";
import {
    JakanIDResponse,
    JakanQueryResponse,
} from "../../response/responseTypes";
import { JakanSearchError } from "../../exceptions";
import { SearchMediaOptions } from "./searchConstants";
import { BASE_JIKAN_URL } from "../../constants";

/*
 * Add support for the following endpoints:
 * - [ ] /clubs
 * - [ ] /producers
 */

class JakanSearch extends JakanClient {
    constructor() {
        super(BASE_JIKAN_URL);
    }

    anime(id: number, extraInfo: ExtraAnimeInfo): Promise<JakanIDResponse>;
    anime(query: AnimeSearchParameters): Promise<JakanQueryResponse>;
    anime(id: number): Promise<JakanIDResponse>;
    anime(query: string): Promise<JakanQueryResponse>;
    // Searches for an anime using either an id, a query, or a set of parameters.
    async anime(
        queryOrId: QueryOrId<AnimeSearchParameters>,
        extraInfo?: ExtraAnimeInfo
    ): Promise<JakanIDResponse | JakanQueryResponse> {
        return await this.prepareRequest<AnimeSearchParameters, ExtraAnimeInfo>(
            SearchMediaOptions.anime,
            queryOrId,
            extraInfo
        );
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
        return await this.prepareRequest<MangaSearchParameters, ExtraMangaInfo>(
            SearchMediaOptions.manga,
            queryOrId,
            extraInfo
        );
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
        return await this.prepareRequest<
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
        return await this.prepareRequest<
            PeopleSearchParameters,
            ExtraPeopleInfo
        >(SearchMediaOptions.people, queryOrId, extraInfo);
    }

    private async prepareRequest<T extends QueryOrId, E extends ExtraInfo>(
        media: string,
        queryOrId: QueryOrId<T>,
        extraInfo?: E
    ): Promise<JakanIDResponse | JakanQueryResponse> {
        if (typeof queryOrId === "number") {
            return await this.withId(media, queryOrId, extraInfo);
        } else if (
            typeof queryOrId === "string" ||
            typeof queryOrId === "object"
        ) {
            // TODO: fix extra-info parameter missing
            return await this.withQuery(media, queryOrId);
        } else {
            throw new JakanSearchError("No query or ID parameter specified.");
        }
    }

    private async withId(
        media: string,
        id: number,
        extraInfo?: string
    ): Promise<JakanIDResponse> {
        const request = this.idRequestBuilder(media, id, extraInfo);
        return await this.makeRequest<JakanIDResponse>(request);
    }

    private async withQuery<T extends QueryOrId>(
        media: string,
        query: T
    ): Promise<JakanQueryResponse> {
        if (typeof query === "number") {
            throw new JakanSearchError("Can't");
        }
        const request = this.queryRequestBuilder(media, query);
        return await this.makeRequest<JakanQueryResponse>(request);
    }
}

export default JakanSearch;
