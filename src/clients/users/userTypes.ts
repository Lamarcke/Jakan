interface JakanUsersDataNode {
    id: number;
    title: string;
    main_picture: {
        medium: string;
        large: string;
    };
}

interface JakanUsersPaging {
    // A string with the url for the next page on this user's list.
    next: string;
}

type JakanUsersData = {
    node: JakanUsersDataNode;
}[];

type JakanUsersResponse = {
    data: JakanUsersData;
    paging: JakanUsersPaging;
};

export default JakanUsersResponse;
