/*
 * Available request types
 */
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

/*
 * Available search order parameters.
 * These are common to anime and manga.
 */
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

/*
 * Common parameters for both anime and manga.
 * See: https://docs.api.jikan.moe/#tag/anime
 * And: https://docs.api.jikan.moe/#tag/manga
 */
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

/*
 * Extra parameters for anime.
 */
enum ExtraAnimeInfoBase {
    episodes = "episodes",
    videos = "videos",
    streaming = "streaming",
    staff = "staff",
}

/*
 * Extra parameters for manga.
 */
enum ExtraMangaInfoBase {
    topics = "topics",
}

// While the ExtraInfo for characters and people are currently the same for v4
// We will keep the common values separate in case they change in the future.
// See: https://docs.api.jikan.moe/#tag/people
// And: https://docs.api.jikan.moe/#tag/characters

enum ExtraMiscInfoBase {
    full = "full",
    voices = "voices",
    anime = "anime",
    manga = "manga",
    pictures = "pictures",
}

// Placeholder for characters extra info
/*
enum ExtraCharacterInfoBase {

}
*/
// Placeholder for people extra info
/*
enum ExtraPeopleInfoBase {

}
 */

export { RequestMediaOptions };
export type {
    SortOptions,
    BaseMediaSearchOrder,
    CharactersSearchOrder,
    PeopleSearchOrder,
    AnimeSearchOrder,
    MangaSearchOrder,
    AnimeRating,
    MangaStatus,
    AnimeStatus,
    MangaMediaTypes,
    AnimeMediaTypes,
    ExtraInfoBase,
    ExtraAnimeInfoBase,
    ExtraMangaInfoBase,
    ExtraMiscInfoBase,
};
