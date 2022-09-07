# Jakan
The de-facto wrapper for the Jikan and MyAnimeList API.

## What's this?
Jakan is a wrapper on top of Jikan (a MAL unnoficial API) and the official MAL api.  

We plan to leverage Jikan api for most of the requests (searching, schedules, recommendations and etc) 
while using the official API for user-related requests.

## Features
What can you expect?

- All requests are cached by default in a store of your choice. 
This, combined with Jikan own cache, means you will hardly ever make unnecessary requests to MAL.  
`Powered by axios-cache-interceptor`


- Platform-agnostic: Built to work with Node and on the browser.


- Typescript first
Typescript is a first citizen here, and almost all request endpoints and their parameters 
(even the parameters of the parameters) have been mapped, so building queries is a breeze.  
Results are also mapped, this means that will know ahead what to expect from a method result.  


- As simple as it gets
We use axios under the hood. All methods are async by default. No expensive calculations, no unnecessary dependencies.

## Installation
`npm i jakan`  
or  
`yarn add jakan`

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

## Clients
- [x] JakanSearch
- [ ] JakanMisc
- [x] JakanUsers

### JakanSearch
- [x] Anime
- [x] Manga
- [ ] Characters
- [ ] People

### JakanMisc
To be implemented.


### JakanUsers
- [x] User anime list
- [x] User manga list

**Why so simple?**


As you can see, there's only two methods that retrieve the public anime and manga list of a given user.  
As of v4, Jikan has removed the user endpoints from their service. So if you want to access 
(this is the only thing that was possible in Jikan even before v4), change and delete entries in a user's library, 
you need to use the official API.  

The main gripe is that using the main API requires a lot more work than just making simple get requests. They need to have their security checks in place.  

You need to at least register an app under your account's api page, and you then need to provide at least its ClientID to access public info.  

Post, put and delete requests require OAuth2 authentication, they will use your own app redirect URL, and some info only relevant to your application.
You also need to provide an PCKE challenge (which could be done in this library, it's actually very simple), and the list goes on...  


There's a lot of secrets envolved (as in secret strings that you need to use for auth), and it's just too much for a simple wrapper library.


While my original plan was to actually implement authentication and post requests, i feel that this library would just get on the way of the
custom code a user would need to implement anyway (you need at least a hosted API/frontend for auth to work).  

So, if you plan to use the endpoints for anything other than getting a user's public info, you are better off implementing your own solution.
This guide will probably help you:  
[How To Fetch User Lists From The Official MyAnimeList API](https://docs.google.com/document/d/1-6H-agSnqa8Mfmw802UYfGQrceIEnAaEh4uCXAPiX5A/edit#heading=h.pgt2v0q492o3)



## Thanks!
Thanks for reading all of this, if you find this project useful, please leave a star, issue or PR :)  


