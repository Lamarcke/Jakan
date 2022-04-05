# Jakan
A very small wrapper for Jikan API.

Currently, it supports most of the endpoints on the Jikan API. Some are not implemented because there's not much demand for them.  
Of course, there's a need for further testing.  

There's no rate-limiting in place. So you need to be careful to respect Jikan limits:  
[Jikan Rate Limiting](https://docs.api.jikan.moe/#section/Information/Rate-Limiting)

For now, what you need to know:  

There's only one class, in one package.  
And ALL methods return null if something goes wrong.  
`As in: Either the request status was not 200 (connection issues) or the request body was null (bad request)`

And if you give the wrong `type` (the first argument in all methods) parameter, 
a `InvalidParameterException` will be thrown.

## Quickstart

```java
import com.jakan.Jakan;

import java.util.HashMap;

public class Main {
    public static void main(String[] args) {
        // Instantiate Jakan
        Jakan jakan = new Jakan();
        // Then use the methods to get your results:

        // Getting info on a specific entry (with its id)
        jakan.getById("anime", 1); // This returns info on Cowboy Bepop (which has id 1)
        jakan.getById("anime", 1, "episodes"); // This returns extra episode info on Cowboy Bepop
        // For now, there is no result caching in place, so please be careful to not abuse the service.
        // It also works for other types:
        jakan.getById("manga", 1); // This returns info of a character with id 1
        jakan.getById("characters", 1); // This returns info of a manga with id 1


        // There's also specific queries inside an entry's extra infos.
        // This is how you acess them.
        HashMap<String, Object> extraFilters = new HashMap<>();
        extraFilters.put("page", 1); // Adds page 1 to your specific query.
        
        // You then provide your HashMap to the method.
        jakan.getById("anime", 1, "episodes", extraFilters); 
        // This will return all info inside page one of the episodes in a anime with id 1.
        // Learn more about specific filters by visiting jikan.moe docs (getTypeById).
        
        // This searchs for that unknow anime, narrto or something.
        jakan.search("anime", "naruto");
        // This is for when you need more filters.
        HashMap<String, Object> filters = new HashMap<>();
        // q stands for query.
        filters.put("q", "naruto");
        // type stands for format
        filters.put("type", "ova");
        // Provide the hashmap as the second parameter:
        jakan.search("anime", filters);
        
    }
}
```

Methods avaiable:  
`TO-DO`  
`Please check the code and jikan docs for now.`