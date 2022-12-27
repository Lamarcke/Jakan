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

/*
 * Using Enum | subtype as type is recognized by Jetbrains IDEs (and i belive most IDEs that build an AST tree)
 * autocomplete, but most LSP-based editors fail to instrospect the enum types and offer correct auto complete options.
 * This means that VS Code/Neovim/etc. would show only the "subtype" type, meaning most users would not receive any autocompletion.
 * While using "keyof typeof Enum" makes so that inserting any other type as input would be recognized as error, it's still
 * a valid workaround for the issue.
 *
 * Example:
 * interface enumWithSubtype = {
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
 * These are common to both characters and people requests.
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

// Alias for the possible ExtraInfo types
type SearchRequestExtraInfo =
    | ExtraAnimeInfo
    | ExtraMangaInfo
    | ExtraCharactersInfo
    | ExtraPeopleInfo;

// Alias for the possible SearchParameters types
type SearchRequestParameters =
    | AnimeSearchParameters
    | MangaSearchParameters
    | CharacterSearchParameters
    | PeopleSearchParameters;

/*
 * This type determines which type of extra info is being used by a function.
 *
 */
type ExtraInfo<
    T extends SearchRequestExtraInfo | string = SearchRequestExtraInfo
> = SearchRequestExtraInfo | string | T;

/*
 * Type to determine if a search function is using query parameters (string | object) or a id (number).
 * Defaults to string if no type is specified.
 */
type QueryOrId<T extends SearchRequestParameters | number | string = string> =
    | SearchRequestParameters
    | number
    | string
    | T;

export type {
    QueryOrId,
    ExtraInfo,
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
