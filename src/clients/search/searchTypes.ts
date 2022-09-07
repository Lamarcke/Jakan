enum SortOptions {
    asc = "asc",
    desc = "desc",
}

enum BaseSearchOrder {
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

interface JakanSearchParameters {
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

// Be sure to check Jikan docs.
interface MangaSearchParameters extends JakanSearchParameters {
    type?: MangaMediaTypes | string;
    status?: MangaStatus | string;
    order_by?: MangaSearchOrder | BaseSearchOrder | string;
    magazines?: string;
}

// Be sure to check Jikan docs.
interface AnimeSearchParameters extends JakanSearchParameters {
    type?: AnimeMediaTypes | string;
    status?: AnimeStatus | string;
    rating?: AnimeRating | string;
    order_by?: AnimeSearchOrder | BaseSearchOrder | string;
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

type ExtraAnimeInfo = ExtraInfoBase | ExtraAnimeInfoBase | string;
type ExtraMangaInfo = ExtraInfoBase | ExtraMangaInfoBase | string;

export type {
    AnimeSearchParameters,
    MangaSearchParameters,
    JakanSearchParameters,
    ExtraAnimeInfo,
    ExtraMangaInfo,
};
