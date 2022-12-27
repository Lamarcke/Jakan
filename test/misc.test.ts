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
        expect(recommendations.data).toBeGreaterThan(0);
    });
    test("should return recent anime recommendations with query", async () => {
        const jakan = new Jakan();
        const misc = jakan.withMemory().forMisc();
        const recommendations = await misc.recommendations({
            target: "anime",
            page: 2,
        });

        expect(recommendations).toHaveProperty("data");
        expect(recommendations.data).toBeGreaterThan(0);
    });
});
