import { UsersExtraInfoOptions, UsersGenders } from "./userConstants";

interface UsersQuery {
    q: string;
    limit?: number;
    page?: number;
    gender?: keyof typeof UsersGenders;
    location?: string;
    minAge?: number;
    maxAge?: number;
}

type UsersExtraInfo = keyof typeof UsersExtraInfoOptions;

export type { UsersExtraInfo, UsersQuery };
