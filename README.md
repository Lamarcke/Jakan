[![Node.JS CI Per-Client](https://github.com/Lamarcke/Jakan/actions/workflows/npm-test.js.yml/badge.svg?branch=main)](https://github.com/Lamarcke/Jakan/actions/workflows/npm-test.js.yml)
[![npm version](https://badge.fury.io/js/jakan.svg)](https://badge.fury.io/js/jakan)

# Jakan

The de-facto wrapper for the Jikan and MyAnimeList API.

## What's this?

Jakan is a wrapper on top of Jikan **v4** (a MAL unnoficial API) and the official MAL api.

It allows you to programatically send requests to the Jikan API. No API key is needed.

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

When this happens, this README will be updated accordingly, you can be sure that the code present in the quickstart
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

**JakanSearch**

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
import Jakan from "jakan";

// Build a JakanMisc client
const miscClient = new Jakan().withMemory().forMisc();

// See page two of top animes
const top = await miscClient.top("anime", {
    page: 2,
});

// Get a random manga
const random = await miscClient.random("manga");

// Get schedule for monday
const mondaySchedule = await miscClient.schedules({
    filter: "monday",
});

// Get all schedules
const schedules = await miscClient.schedules();
```

**JakanUsers**

```typescript
import Jakan from "jakan";

const usersClient = new Jakan().withMemory().forUsers();

// See a user's profile
const user = await usersClient.users("Lamarco");

// Search for a user
const user = await usersClient.usersSearch("Lamarco");
```

### Where are my types?

We export types for Clients and request building for your usage.  
You don't actually need to import these types, you can just trust your editor, and it will autocomplete and suggest
values for you.  
e.g.:

```typescript
import {
    MangaSearchParameters,
    AnimeSearchParameters,
    ExtraAnimeInfo,
} from "jakan";

// You can preview the available values in fields marked as enum by pressing CTRL + SPACE (or equivalent) in your editor.
const myQuery: MangaSearchParameters = {
    q: "Solo Leveling", // q stands for Query and is the only non-optional value.
    type: "manwha", // Type is an enum.
    status: "complete", // Status is also an enum
};

// This is the JakanSearch client we built above
jakan.anime(myQuery).then();
```

## Javascript usage

The library works the same when using plain Javascript. You just won't get the Typescript goodies.
Still, LSP-based editors (like VS Code) and IDEs should be able to instrospect the `index.d.ts` file and provide you with some basic type hinting.

## Cache

Along with the cache provider, you can also set a custom cache age/TTL.

PS: `cacheAge` should be in milliseconds.

```typescript
const jakan = new Jakan();
// cacheAge is available on all clients' with'Provider' methods.
const clientWithoutCache = jakan.withMemory(5000);
```

You can opt-out of `axios-cache-interceptor`'s cache by using a `cacheAge` of `0` when creating client classes.  
Internally, this will make the client use a pure `axios` instance. Without the `axios-cache-interceptor` adapter.

If you are having problems related to `axios-cache-interceptor`, try setting `cacheAge` to `0` and opening an issue in this repo.

The `JakanUsers` client has cache disabled by default. You can still enable it by setting a custom `cacheAge`.

## Project status

This library is currently in a finished state, and future updates will be mostly for bug fixes and for breaking Jikan API changes.

Still, we need some help to map the Jikan API responses, since it takes a lot of time and is a very manual process.  
Please open an issue or make a PR if you want to contribute. Thanks!

## Clients

-   [x] JakanSearch
-   [x] JakanMisc
-   [x] JakanUsers

### JakanSearch

Client for search related requests.

-   [x] Anime
-   [x] Manga
-   [x] Characterse
-   [x] People

Low priority methods that may be implemented in the future:

-   [ ] Producers
-   [ ] Clubs

### JakanMisc

Client for everything not related to the main media requests. Like recommendations, top, schedules etc.

-   [x] Random
-   [x] Top
-   [x] Recommendations
-   [x] Reviews
-   [x] Genres
-   [x] Schedules
-   [x] Season

### JakanUsers

Client for interacting with Jikan Users' endpoints.

-   [x] Users profile, including statistics, history, etc.
-   [x] Users search

## Thanks

Thanks for reading all of this, if you find this project useful, please leave a star, issue or PR :)
