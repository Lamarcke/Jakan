import { describe } from "node:test";
import Jakan, { JakanSearch } from "../src";


describe("JakanSearch", () => {
    test("should return a JakanSearch client", () => {
        const jakan = new Jakan();
        const search = jakan.forSearch();
        expect(search).toBeInstanceOf(JakanSearch);
    });
})