import JakanSearch from "../clients/search/search";

// A generic map for the "data" field of Jikan request responses.
interface JakanData {
    // TODO: Map each request individually.
    // This will, of course, take a really long time.
    [key: string]: unknown;
    mal_id: number;
}

type JakanPaginationItems = {
    count: number;
    total: number;
    per_page: number;
};

type JakanPagination = {
    last_visible_page: number;
    has_next_page: boolean;
    items: JakanPaginationItems;
};

interface JakanSeasonListResponse {
    data: [];
}

type JakanQueryResponse = {
    data: JakanData[];
    pagination: JakanPagination;
};

type JakanIDResponse = {
    data: JakanData;
    pagination: JakanPagination;
};

export type { JakanQueryResponse, JakanIDResponse, JakanSeasonListResponse };
