enum SeasonRequestFilter {
    tv = "tv",
    ova = "ova",
    movie = "movie",
    special = "special",
    ona = "ona",
    music = "music",
}

enum ScheduleRequestQueryFilter {
    monday = "monday",
    tuesday = "tuesday",
    wednesday = "wednesday",
    thursday = "thursday",
    friday = "friday",
    unknow = "unknow",
    other = "other",
}
/*
 * Used in schedule query parameters that require a "bool" value.
 * Since they are query parameters, they are in fact just strings.
 */
enum ScheduleRequestStringBooleans {
    true = "true",
    false = "false",
}

enum TopRequestFiltersBase {
    upcoming = "upcoming",
    bypopularity = "bypopularity",
    favorite = "favorite",
}

enum TopRequestAnimeFilters {
    airing = "airing",
}

enum TopRequestMangaFilters {
    publishing = "publishing",
}

enum TopRequestOptions {
    anime = "anime",
    manga = "manga",
    characters = "characters",
    people = "people",
    reviews = "reviews",
}

enum MiscClientOptions {
    random = "random",
    recommendations = "recommendations",
    top = "top",
    seasons = "seasons",
    schedules = "schedules",
    reviews = "reviews",
}

enum RecommendationsTargetOptions {
    anime = "anime",
    manga = "manga",
}

export { MiscClientOptions };
export type {
    RecommendationsTargetOptions,
    TopRequestFiltersBase,
    TopRequestAnimeFilters,
    TopRequestMangaFilters,
    TopRequestOptions,
    ScheduleRequestQueryFilter,
    ScheduleRequestStringBooleans,
    SeasonRequestFilter,
};
