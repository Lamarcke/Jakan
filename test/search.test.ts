import Jakan from "../src";
import JakanSearch from "../src/clients/search/search";

// All tests must include Naruto as the search query
// because Naruto is the first anime ever made

describe("JakanSearch", () => {
    test("should return a JakanSearch object", () => {
        const jakan = new Jakan();
        const search = jakan.withMemory().forSearch();
        expect(search).toBeInstanceOf(JakanSearch);
    });
    test("should return anime search results", async () => {
        const jakan = new Jakan();
        const search = jakan.withMemory().forSearch();
        const { data } = await search.anime("naruto");
        expect(data.length).toBeGreaterThan(0);
    });

    test("should return anime search results with query params", async () => {
        const jakan = new Jakan();
        const search = jakan.withMemory().forSearch();
        const { data } = await search.anime({
            q: "naruto",
            sort: "asc",
            order_by: "title",
            page: 1,
            limit: 10,
        });
        expect(data.length).toBeGreaterThan(0);
    });

    test("should return anime search results with extra info", async () => {
        const jakan = new Jakan();
        const search = jakan.withMemory().forSearch();
        const { data } = await search.anime(1, "full");
        expect(data).toHaveProperty("mal_id");
    });

    test("should return manga search results", async () => {
        const jakan = new Jakan();
        const search = jakan.withMemory().forSearch();
        const { data } = await search.manga("naruto");
        expect(data.length).toBeGreaterThan(0);
    });
    test("should return character search results", async () => {
        const jakan = new Jakan();
        const search = jakan.withMemory().forSearch();
        const { data } = await search.characters("naruto");
        expect(data.length).toBeGreaterThan(0);
    });
    test("should return people search results", async () => {
        const jakan = new Jakan();
        const search = jakan.withMemory().forSearch();
        const { data } = await search.people("naruto");
        expect(data.length).toBeGreaterThan(0);
    });
});
