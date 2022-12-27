import JakanSearch from "../clients/search/search";

interface JakanData {
    [key: string]: any;
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

type JakanQueryResponse = {
    pagination: JakanPagination;
    data: JakanData[];
};

type JakanIDResponse = {
    pagination: JakanPagination;
    data: JakanData;
};

export type { JakanQueryResponse, JakanIDResponse };
