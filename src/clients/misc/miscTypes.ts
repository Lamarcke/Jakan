import { AnimeMediaTypes, MangaMediaTypes } from "../search/searchConstants";
import {
    GenresRequestFilter,
    ScheduleRequestQueryFilter,
    ScheduleRequestStringBooleans,
    SeasonRequestFilter,
    TopRequestAnimeFilters,
    TopRequestFiltersBase,
    TopRequestMangaFilters,
} from "./miscConstants";

// This file contains the types for the miscellaneous endpoints.

interface GenresQuery {
    filter?: keyof typeof GenresRequestFilter;
}

interface SeasonListQuery {
    filter?: keyof typeof SeasonRequestFilter;
    page: number;
}

interface SeasonQuery {
    filter?: keyof typeof SeasonRequestFilter;
    page?: number;
}

interface ScheduleQuery {
    page?: number;
    filter?: keyof typeof ScheduleRequestQueryFilter;
    kids?: keyof typeof ScheduleRequestStringBooleans;
    sfw?: keyof typeof ScheduleRequestStringBooleans;
    limit?: number;
}

interface TopAnimeQueryOptions {
    type?: keyof typeof AnimeMediaTypes;
    filter?:
        | keyof typeof TopRequestFiltersBase
        | keyof typeof TopRequestAnimeFilters;
    page?: number;
    limit?: number;
}

interface TopMangaQueryOptions {
    type?: keyof typeof MangaMediaTypes;
    filter?:
        | keyof typeof TopRequestFiltersBase
        | keyof typeof TopRequestMangaFilters;
    page?: number;
    limit?: number;
}

interface TopCharactersQueryOptions {
    page?: number;
    limit?: number;
}

interface TopPeopleQueryOptions {
    page?: number;
    limit?: number;
}

interface TopReviewsQueryOptions {
    page?: number;
}

interface RecommendationsQueryOptions {
    page?: number;
}

type TopRequestQuery =
    | TopAnimeQueryOptions
    | TopMangaQueryOptions
    | TopCharactersQueryOptions
    | TopPeopleQueryOptions
    | TopReviewsQueryOptions;

// Convert to enum with keyof typeof syntax if it ever grows too large.
type RandomRequestOptions =
    | "anime"
    | "manga"
    | "characters"
    | "people"
    | "users";

type SeasonListRequestWhen = "now" | "upcoming";

export type {
    RandomRequestOptions,
    RecommendationsQueryOptions,
    TopRequestQuery,
    ScheduleQuery,
    SeasonQuery,
    SeasonListRequestWhen,
    SeasonListQuery,
    GenresQuery,
};
