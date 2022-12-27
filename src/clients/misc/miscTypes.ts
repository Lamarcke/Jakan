import { RecommendationsTargetOptions } from "./miscConstants";

// This file contains the types for the miscellaneous endpoints.
interface RecommendationsQueryOptions {
    page?: number;
}

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
};
