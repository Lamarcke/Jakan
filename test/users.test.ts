import Jakan from "../src";
import JakanUsers from "../src/clients/users/users";

jest.setTimeout(10000);

describe("JakanUsers", () => {
    test("should return a JakanUsers instance", () => {
        const client = new Jakan().withMemory().forUsers();
        expect(client).toBeInstanceOf(JakanUsers);
    });
    test("should return a user profile", async () => {
        const client = new Jakan().withMemory().forUsers();
        const user = await client.users("Lamarco");
        expect(user).toHaveProperty("data");
        const userData = user.data;
        expect(userData).toHaveProperty("mal_id");
    });
    test("should return a user statistics using extra info parameter", async () => {
        const client = new Jakan().withMemory().forUsers();
        const user = await client.users("Lamarco", "statistics");
        expect(user).toHaveProperty("data");
    });
    test("should return user search results", async () => {
        const client = new Jakan().withMemory().forUsers();
        const user = await client.usersSearch("Lamarco");
        expect(user).toHaveProperty("data");
        expect(user.data.length).toBeGreaterThan(0);
    });
    test("should return user search results with query parameters", async () => {
        const client = new Jakan().withMemory().forUsers();
        const user = await client.usersSearch({
            q: "Lamarco",
            gender: "male",
        });
        expect(user).toHaveProperty("data");
        expect(user.data.length).toBeGreaterThan(0);
    });
});
