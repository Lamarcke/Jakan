// TODO: Move all enums to searchConstants.ts
// noinspection DuplicatedCode

import {
    AnimeMediaTypes,
    AnimeRating,
    AnimeSearchOrder,
    AnimeStatus,
    BaseMediaSearchOrder,
    CharactersSearchOrder,
    ExtraAnimeInfoBase,
    ExtraInfoBase,
    ExtraMangaInfoBase,
    ExtraMiscInfoBase,
    MangaMediaTypes,
    MangaSearchOrder,
    MangaStatus,
    PeopleSearchOrder,
    SortOptions,
} from "./searchConstants";
import { JakanIDResponse, JakanQueryResponse } from "../response/responseTypes";

/*
 * Using Enum | subtype as type is recognized by Jetbrains IDEs (and i belive most IDEs that build an AST tree)
 * autocomplete, but most LSP-based editors fail to instrospect the enum types and offer correct auto complete options.
 * This means that VS Code/Neovim/etc. would show only the "subtype" type,
 * meaning most users would not receive any autocompletion.
 * While using "keyof typeof Enum" makes so that inserting any other type as input would be recognized as error, it's still
 * a valid workaround for the issue.
 *
 * Example:
 * type enumWithSubtype = {
 *    sort: SortOptions | string
 * }
 *
 * Most editors would recognize the "sort" property as only of type string, and would not offer any autocompletion.
 * So make sure to use the "keyof typeof Enum" type when defining the type using Enums.
 */

// Some parameters are common to both manga and anime, so we define them here.
interface JakanMediaSearchParameters {
    q: string;
    page?: number;
    limit?: number;
    score?: number;
    min_score?: number;
    max_score?: number;
    sfw?: boolean;
    genres?: string;
    genres_exclude?: string;
    sort?: keyof typeof SortOptions;
    letter?: string;
    producers?: string;
    start_date?: string;
    end_date?: string;
}

/*
 * Search parameters for non-media related searches.
 * These are common to both characters and people.
 */
interface JakanMiscSearchParameters {
    q: string;
    page?: number;
    limit?: number;
    sort?: keyof typeof SortOptions;
    letter?: string;
}

interface CharacterSearchParameters extends JakanMiscSearchParameters {
    order_by?: keyof typeof CharactersSearchOrder;
}

interface PeopleSearchParameters extends JakanMiscSearchParameters {
    order_by?: keyof typeof PeopleSearchOrder;
}

// Be sure to check Jikan docs.
interface MangaSearchParameters extends JakanMediaSearchParameters {
    type?: keyof typeof MangaMediaTypes;
    status?: keyof typeof MangaStatus;
    order_by?:
        | keyof typeof MangaSearchOrder
        | keyof typeof BaseMediaSearchOrder;
    magazines?: string;
}

// Be sure to check Jikan docs.
interface AnimeSearchParameters extends JakanMediaSearchParameters {
    type?: keyof typeof AnimeMediaTypes;
    status?: keyof typeof AnimeStatus;
    rating?: keyof typeof AnimeRating;
    order_by?:
        | keyof typeof AnimeSearchOrder
        | keyof typeof BaseMediaSearchOrder;
}

type ExtraAnimeInfo =
    | keyof typeof ExtraInfoBase
    | keyof typeof ExtraAnimeInfoBase;
type ExtraMangaInfo =
    | keyof typeof ExtraInfoBase
    | keyof typeof ExtraMangaInfoBase;
type ExtraCharactersInfo = keyof typeof ExtraMiscInfoBase;
type ExtraPeopleInfo = keyof typeof ExtraMiscInfoBase;

/*
 * This makes it possible to use the ExtraInfo type without type arguments.
 */
type SearchRequestExtraInfo =
    | ExtraAnimeInfo
    | ExtraMangaInfo
    | ExtraCharactersInfo
    | ExtraPeopleInfo;

/*
 * This is used when it's impossible to use type parameters and use the QueryOrId type.
 */

type SearchRequestParameters =
    | AnimeSearchParameters
    | MangaSearchParameters
    | CharacterSearchParameters
    | PeopleSearchParameters
    | string;

type ExtraInfo<
    T extends
        | ExtraAnimeInfo
        | ExtraMangaInfo
        | ExtraCharactersInfo
        | ExtraPeopleInfo
> = T;

// Shorthand for the SearchRequestExtraInfo + number types
type QueryOrId<T extends SearchRequestParameters | number | string> =
    | number
    | string
    | T;

type JakanResponse<T extends JakanIDResponse | JakanQueryResponse> = T;

export type {
    QueryOrId,
    ExtraInfo,
    JakanResponse,
    SearchRequestParameters,
    SearchRequestExtraInfo,
    AnimeSearchParameters,
    MangaSearchParameters,
    CharacterSearchParameters,
    PeopleSearchParameters,
    ExtraAnimeInfo,
    ExtraMangaInfo,
    ExtraCharactersInfo,
    ExtraPeopleInfo,
};
