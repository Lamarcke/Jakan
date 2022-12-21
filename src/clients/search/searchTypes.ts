enum RequestMediaOptions {
    anime = "anime",
    manga = "manga",
    characters = "characters",
    people = "people",
}

enum SortOptions {
    asc = "asc",
    desc = "desc",
}

enum BaseMediaSearchOrder {
    malId = "mal_id",
    title = "title",
    startDate = "start_date",
    endDate = "end_date",
    score = "score",
    scored_by = "scored_by",
    rank = "rank",
    popularity = "popularity",
    members = "members",
    favorites = "favorites",
}

enum CharactersSearchOrder {
    malId = "mal_id",
    name = "name",
    favorites = "favorites",
}

enum PeopleSearchOrder {
    malId = "mal_id",
    name = "name",
    favorites = "favorites",
    birthday = "birthday",
}

enum AnimeSearchOrder {
    type = "type",
    rating = "rating",
    episodes = "episodes",
}

enum MangaSearchOrder {
    chapters = "chapters",
    volumes = "volumes",
}

enum AnimeRating {
    g = "g",
    pg = "pg",
    pg13 = "pg13",
    r17 = "r17",
    r = "r",
    rx = "rx",
}

enum MangaStatus {
    publishing = "publishing",
    complete = "complete",
    hiatus = "hiatus",
    discontinued = "discontinued",
    upcoming = "upcoming",
}

enum AnimeStatus {
    airing = "airing",
    complete = "complete",
    upcoming = "upcoming",
}

enum MangaMediaTypes {
    manga = "manga",
    novel = "novel",
    lightnovel = "lightnovel",
    oneshot = "oneshot",
    doujin = "doujin",
    manwha = "manwha",
    manhua = "manhua",
}

enum AnimeMediaTypes {
    tv = "tv",
    movie = "movie",
    ova = "ova",
    special = "special",
    ona = "ona",
    music = "music",
}

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
    sort?: SortOptions | string;
    letter?: string;
    producers?: string;
    start_date?: string;
    end_date?: string;
}

interface JakanMiscSearchParameters {
    q: string;
    page?: number;
    limit?: number;
    sort?: SortOptions | string;
    letter?: string;
}

interface CharacterSearchParameters extends JakanMiscSearchParameters {
    order_by?: CharactersSearchOrder | string;
}

interface PeopleSearchParameters extends JakanMiscSearchParameters {
    order_by?: PeopleSearchOrder | string;
}

// Be sure to check Jikan docs.
interface MangaSearchParameters extends JakanMediaSearchParameters {
    type?: MangaMediaTypes | string;
    status?: MangaStatus | string;
    order_by?: MangaSearchOrder | BaseMediaSearchOrder | string;
    magazines?: string;
}

// Be sure to check Jikan docs.
interface AnimeSearchParameters extends JakanMediaSearchParameters {
    type?: AnimeMediaTypes | string;
    status?: AnimeStatus | string;
    rating?: AnimeRating | string;
    order_by?: AnimeSearchOrder | BaseMediaSearchOrder | string;
}

// Common for both anime and manga.
enum ExtraInfoBase {
    full = "full",
    characters = "characters",
    news = "news",
    forum = "forum",
    pictures = "pictures",
    statistics = "statistics",
    moreInfo = "moreinfo",
    recommendations = "recommendations",
    userUpdates = "userupdates",
    reviews = "reviews",
    relations = "relations",
    themes = "themes",
    external = "external",
}

enum ExtraAnimeInfoBase {
    episodes = "episodes",
    videos = "videos",
    streaming = "streaming",
    staff = "staff",
}

enum ExtraMangaInfoBase {
    topics = "topics",
}

enum ExtraMiscInfoBase {
    full = "full",
    voice = "voice",
    anime = "anime",
    manga = "manga",
    pictures = "pictures",
}

type ExtraAnimeInfo = ExtraInfoBase | ExtraAnimeInfoBase | string;
type ExtraMangaInfo = ExtraInfoBase | ExtraMangaInfoBase | string;
type ExtraCharactersInfo = ExtraMiscInfoBase | string;
type ExtraPeopleInfo = ExtraMiscInfoBase | string;

type SearchRequestType =
    | AnimeSearchParameters
    | MangaSearchParameters
    | CharacterSearchParameters
    | PeopleSearchParameters;

type SearchExtraInfoType =
    | ExtraAnimeInfo
    | ExtraMangaInfo
    | ExtraCharactersInfo
    | ExtraPeopleInfo;

export { RequestMediaOptions };

export type {
    
    SearchRequestType,
    SearchExtraInfoType,
    AnimeSearchParameters,
    MangaSearchParameters,
    CharacterSearchParameters,
    PeopleSearchParameters,
    ExtraAnimeInfo,
    ExtraMangaInfo,
    ExtraCharactersInfo,
    ExtraPeopleInfo,
};
