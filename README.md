# Jakan
The de-facto wrapper for the Jikan and MyAnimeList API.

## What's this?
Jakan is a wrapper on top of Jikan (a MAL unnoficial API) and the official MAL api.  

We plan to leverage Jikan api for most of the requests (searching, schedules, recommendations and etc) 
while using the official API for user-related requests.

## Features
What can you expect?

- All requests (except user ones) are cached by default in a store of your choice. 
This, combined with Jikan own cache, means you will hardly make new unnecessary requests to MAL.  
`Powered by axios-cache-interceptor`


- Platform-agnostic: Built to work with Node and on the browser.


- Typescript first
Typescript is a first citizen here, and almost all request endpoints and their parameters 
(even the parameters of the parameters) have been mapped, so building queries is a breeze.  
Results are also mapped, this means that will know ahead what to expect from a method result.  


- As simple as it gets
We use axios under the hood. All methods are async by default. No expensive calculations, no unnecessary dependencies.

## Installation
~~`npm i jakan`~~  
The library is not in npm yet.  

Still, you can install it using:  
`npm i this-repo-url.git`  

## Usage

Jakan uses a builder-pattern approach to building it's clients.  
As the end user, the only class you should be using for creating new instances is the main one (that acts as a Director).  
We include three clients for requests:  


`JakanSearch` - Responsible for searching anime, manga, characters and people.  
`JakanMisc` - Responsible for everything related with miscellaneous data. Includes schedules, recommendations and etc.  
`JakanUsers` - The client responsible for leveraging MAL. Authenticates, retrieves and changes a user's library.  

Choosing a client is simple, just use the respective `.for'Client'()` (where `'Client'` is the client name.) method on Jakan.  
Then choose a cache provider. You can just use memory or the WebStorage API for a quickstart.
```typescript
import {Jakan} from "jakan";
const jakan = new Jakan().forSearch().withMemory()

// Now you just need to use the methods of the client you choose.
jakan.anime("Naruto").then(...) // async/await syntax works too.
jakan.manga("Sono bisque").then(...) 

// With ids
jakan.anime(1)
// With extra info attached
// PS: extraInfo (second parameter) is an enum, you may know the available values by pressing CTRL + Space or equivalent.
jakan.anime(1, "characters")
// etc...
```

### Where are my types?
We export types for Clients and request building for your usage.  
You don't actually need to import these types, you can just trust your IDE, and it will autocomplete and suggest values for you.  
e.g.:

```typescript
import {MangaSearchParameters, AnimeSearchParameters} from "jakan";

// You can preview the available values in fields marked as enum by pressing CTRL + SPACE (or equivalent) in your IDE
const myQuery: MangaSearchParameters = {
    q: "Solo Leveling",  // q stands for Query and is the only non-optional value.
    type: "manwha", // Type is an enum.
    status: "" // Status is also an enum
}


// This is the JakanSearch client we built above
jakan.anime(myQuery).then()
```

Note: all enums are exported as types, so you may only use their values as reference. Again, just press CTRL + Space and 
you will get the available values.

### Project status
This library is not finished yet. We are mapping all endpoints manually, so it takes some time.

##### Clients
- [x] JakanSearch
- [ ] JakanMisc
- [ ] JakanUsers

#### JakanSearch
- [x] Anime
- [x] Manga
- [ ] Characters
- [ ] People

## Thanks!
Thanks for reading all of this, if you find this project useful, please leave a star, issue or PR :)  


