import Jakan from "../src";
import JakanMisc from "../src/clients/misc/misc";

describe("JakanMisc", () => {
    test("should return a JakanMisc object", () => {
        const jakan = new Jakan();
        const misc = jakan.withMemory().forMisc();
        expect(misc).toBeInstanceOf(JakanMisc);
    });
    test("should return random request endpoint results", async () => {
        const jakan = new Jakan();
        const misc = jakan.withMemory().forMisc();
        const random = await misc.random("anime");
        expect(random.data).toHaveProperty("mal_id");
    });
    test("should return recent anime recommendations", async () => {
        const jakan = new Jakan();
        const misc = jakan.withMemory().forMisc();
        const recommendations = await misc.recommendations("anime");
        expect(recommendations).toHaveProperty("data");
        expect(recommendations.data.length).toBeGreaterThan(0);
    });
    test("should return recent anime recommendations with query", async () => {
        const jakan = new Jakan();
        const misc = jakan.withMemory().forMisc();
        const recommendations = await misc.recommendations("anime", {
            page: 2,
        });
        expect(recommendations).toHaveProperty("data");
        expect(recommendations.data.length).toBeGreaterThan(0);
    });
    test("should return top anime", async () => {
        const jakan = new Jakan();
        const misc = jakan.withMemory().forMisc();
        const top = await misc.top("anime");
        expect(top).toHaveProperty("data");
        expect(top.data.length).toBeGreaterThan(0);
    });
    test("should return top anime ovas with query", async () => {
        const jakan = new Jakan();
        const misc = jakan.withMemory().forMisc();
        const top = await misc.top("anime", {
            type: "ova",
            filter: "bypopularity",
        });
        expect(top).toHaveProperty("data");
        expect(top.data.length).toBeGreaterThan(0);
    });
    test("should return schedule based on query", async () => {
        const jakan = new Jakan();
        const misc = jakan.withMemory().forMisc();
        const schedule = await misc.schedule({
            filter: "monday",
            page: 1,
        });
        expect(schedule).toHaveProperty("data");
        expect(schedule.data.length).toBeGreaterThan(0);
    });
    test("should return season based on year and season parameters", async () => {
        const jakan = new Jakan();
        const misc = jakan.withMemory().forMisc();
        const season = await misc.season(2020, "summer");
        expect(season).toHaveProperty("data");
        expect(season.data.length).toBeGreaterThan(0);
    });
    test("should return season based on year, season and query parameters", async () => {
        const jakan = new Jakan();
        const misc = jakan.withMemory().forMisc();
        const season = await misc.season(2020, "summer", {
            page: 2,
        });
        expect(season).toHaveProperty("data");
        expect(season.data.length).toBeGreaterThan(0);
    });
    test("should return season list", async () => {
        const jakan = new Jakan();
        const misc = jakan.withMemory().forMisc();
        const seasonList = await misc.seasonList();
        expect(seasonList).toHaveProperty("data");
        expect(seasonList.data.length).toBeGreaterThan(0);
    });
    test("should return current season list based on when", async () => {
        const jakan = new Jakan();
        const misc = jakan.withMemory().forMisc();
        const seasonList = await misc.seasonList("now");
        expect(seasonList).toHaveProperty("data");
        expect(seasonList.data.length).toBeGreaterThan(0);
    });
    test("should return upcoming season list based on when and query", async () => {
        const jakan = new Jakan();
        const misc = jakan.withMemory().forMisc();
        const seasonList = await misc.seasonList("upcoming", {
            filter: "tv",
            page: 2,
        });
        expect(seasonList).toHaveProperty("data");
        expect(seasonList.data.length).toBeGreaterThan(0);
    });
});
