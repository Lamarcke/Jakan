# Jakan

The de-facto wrapper for the Jikan and MyAnimeList API.

## What's this?

Jakan is a wrapper on top of Jikan **v4** (a MAL unnoficial API) and the official MAL api.

We plan to leverage Jikan api for most of the requests (searching, schedules, recommendations and etc)
while using the official API for user-related requests.

## Features

What can you expect?

-   All requests are cached by default in a store of your choice.  
    This, combined with Jikan's own cache, means you will hardly ever make unnecessary requests to Jikan/MAL.  
    `Powered by axios-cache-interceptor`

-   Platform-agnostic:  
    We use Parcel to build the library with support for most browsers and node environments.
    This includes compatibility with CommonJS, and ESM.
    We are also limiting ourselves to ES5 syntax for maximum compatibility.

-   Typescript first  
    Typescript is a first citizen here, and almost all request endpoints and their parameters
    (even the parameters of the parameters) have been mapped, so building queries is a breeze.  
    Results are also mapped.

-   Javascript available  
    You can also use this library with plain javascript. Our build code is just a Javascript file with a `index.d.ts`.
    Even with plain JS, some editors are able to check this file and show some basic type hinting.
    We still highly recommend using Typescript for the extra goodies. ;)

-   As simple as it gets  
    We use `axios` under the hood. All methods are async by default. No expensive calculations, no unnecessary dependencies.

## Installation

`npm i jakan`  
or  
`yarn add jakan`

## Breaking changes on 1.0.0

This is only relevant if you were using this library before `1.0.0`.

Starting from version `1.0`, a small change will happen on how the builder process for the Jakan class is done. The
change is pretty simple:  
We will be inverting the order of methods to call in the builder class, the new order is as follow:  
`choosing cache provider --> choosing media type`  
instead of:  
`choosing media type --> choosing cache provider`

The main reason for this change is described in this [issue](https://github.com/Lamarcke/Jakan/issues/2).

When this happens, this README will be updated acorddingly, you can be sure that the code present in the quickstart
guides below are the correct way.

If you have a service built on top of this project, and don't want to update now, you can pin the `0.9` branch from this
repo. In your `package.json` file:

```json
"dependencies": {
    "jakan": "Lamarcke/Jakan#0.9"
},
```

This change will only happen when the `1.0` version is out in the `npm` registry.

## Usage

Jakan uses a builder-pattern approach to building it's clients.  
As the end user, the only class you should be using for creating new instances is the main one (named `Jakan`).  
We include three clients for requests:

`JakanSearch` - Responsible for searching anime, manga, characters and people.  
`JakanMisc` - Responsible for everything related with miscellaneous data. Includes schedules, recommendations and etc.  
`JakanUsers` - The client responsible for leveraging MAL. Authenticates, retrieves and changes a user's library.

Choosing a client is simple, just use the respective `.for'Client'()` (where `'Client'` is the client name.) method on
Jakan.  
Then, choose a cache provider. You can use a memory cache or the WebStorage API for a quickstart.

```typescript
import {Jakan} from "jakan";
const jakan = new Jakan().withMemory().forSearch()

// Now you just need to use the methods of the client you choose.
jakan.anime("Naruto").then(...) // async/await syntax works too.
jakan.manga("Sono bisque").then(...)

// With ids
jakan.anime(1)
// With extra info attached
// PS: extraInfo (second parameter) is an enum, you may know the available values by pressing CMD + Space (show auto-complete) in your editor.
jakan.anime(1, "characters")
// etc...
```

**JakanMisc**  
```typescript
import Jakan from "jakan"

// Build a JakanMisc client
const miscClient = new Jakan().withMemory().forMisc()

// See page two of top animes
const top = await miscClient.top("anime", {
    page: 2
})

// Get a random manga
const random = await miscClient.random("manga")

// Get schedule for monday
const schedule = await miscClient.schedule({
    filter: "monday"
})

// Get all schedules
const schedule = await miscClient.schedule()

const usersClient = new Jakan().withMemory().forUsers()

// See a user's profile
const user = await usersClient.users("Lamarco")

// Search for a user
const user = await usersClient.usersSearch("Lamarco")

```

### Where are my types?

We export types for Clients and request building for your usage.  
You don't actually need to import these types, you can just trust your editor, and it will autocomplete and suggest
values for you.  
e.g.:

```typescript
import { MangaSearchParameters, AnimeSearchParameters } from "jakan";

// You can preview the available values in fields marked as enum by pressing CTRL + SPACE (or equivalent) in your editor.
const myQuery: MangaSearchParameters = {
    q: "Solo Leveling", // q stands for Query and is the only non-optional value.
    type: "manwha", // Type is an enum.
    status: "", // Status is also an enum
};

// This is the JakanSearch client we built above
jakan.anime(myQuery).then();
```



This will make the editor/typescript language server understand that you are building a `JakanSearch` client.  
You can also import and use `JakanMisc` and `JakanUsers`.

**PS**: This should only happen in versions prior to `1.0`. Make sure the build methods are being called in the correct
order if you are on latter versions.

## Javascript usage

The library works the same when using plain Javascript. You just won't get the Typescript goodies.
Still, LSP-based editors (like VS Code) and IDEs should be able to instrospect the `index.d.ts` file and provide you with some basic type hinting.

### Project status

This library is not finished yet. We are mapping all endpoints manually, so it takes some time.  
PRs are very welcome.

## Clients

-   [x] JakanSearch
-   [x] JakanMisc
-   [x] JakanUsers

### JakanSearch

Client for search related requests.

-   [x] Anime
-   [x] Manga
-   [x] Characters
-   [x] People

### JakanMisc

Client for everything not related to main media requests. Like recommendations, top, schedules etc.

### JakanUsers

Client for interacting with MAL's public user endpoints.
Only public endpoints are available.

-   [x] User anime list
-   [x] User manga list

**Why so simple?**

Using the MAL API for this library is rather troublesome, most endpoints are protected, and you would need to setup complex OAuth2 authentication flows to be able to use them with this library.

So, rather than getting in the way of the custom code you would have to build anyway, we prefer to have only the most used public endpoints available. You still need to provide a `clientID` for this to work.

A refactoring to use Jikan V4 API's own user endpoints is on the works, and will be one of the milestones for 1.0.
Once it's out, this README will be updated.

If you want to use the protected MAL API's endpoints, this guide will probably help you:  
[How To Fetch User Lists From The Official MyAnimeList API](https://docs.google.com/document/d/1-6H-agSnqa8Mfmw802UYfGQrceIEnAaEh4uCXAPiX5A/edit#heading=h.pgt2v0q492o3)

## Thanks

Thanks for reading all of this, if you find this project useful, please leave a star, issue or PR :)
