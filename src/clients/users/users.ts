import JakanClient from "../base";
import { BASE_JIKAN_URL } from "../../constants";

// A client responsible for communication with MAL official API for user related requests.
// Please read the Jakan README for more info on how this works.
class JakanUsers extends JakanClient {
    constructor() {
        super(BASE_JIKAN_URL);
    }
}

export default JakanUsers;
