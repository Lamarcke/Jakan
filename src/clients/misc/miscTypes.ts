import { AnimeMediaTypes, MangaMediaTypes } from "../search/searchConstants";
import {
    RecommendationsTargetOptions,
    TopRequestAnimeFilters,
    TopRequestFiltersBase,
    TopRequestMangaFilters,
} from "./miscConstants";

// This file contains the types for the miscellaneous endpoints.

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

type RecommendationsRequestQuery =
    | RecommendationsQueryOptions
    | keyof typeof RecommendationsTargetOptions;

// Convert to enum with keyof typeof syntax if it ever grows too large.
type RandomRequestOptions =
    | "anime"
    | "manga"
    | "characters"
    | "people"
    | "users";

type MiscRequestParameters = RecommendationsRequestQuery | string;

export type {
    MiscRequestParameters,
    RandomRequestOptions,
    RecommendationsRequestQuery,
    TopRequestQuery,
};
