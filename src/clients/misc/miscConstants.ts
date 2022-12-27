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
};
