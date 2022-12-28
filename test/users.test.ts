import Jakan from "../src";
import JakanUsers from "../src/clients/users/users";

describe("JakanUsers", () => {
    test("should return a JakanUsers instance", () => {
        const client = new Jakan().withMemory().forUsers();
        expect(client).toBeInstanceOf(JakanUsers);
    });
});
