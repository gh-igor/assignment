import { groupBy } from "../groupBy";

const data = [
    {
        "userId": 1,
        "id": 1,
        "title": "sunt aut facere repellat",
        "body": "quia et suscipit"
    },
    {
        "userId": 1,
        "id": 2,
        "title": "qui est esse",
        "body": "est rerum tempore vitae"
    },
    {
        "userId": 1,
        "id": 3,
        "title": "ea molestias quasi ",
        "body": "et iusto sed quo iure"
    },
    {
        "userId": 2,
        "id": 4,
        "title": "eum et est occaecati",
        "body": "ullam et saepe reiciendis voluptatem adipisci"
    },
];

describe("groupBy", () => {

    test("by key", () => {
        const expected = {
            1: data.slice(0, 3),
            2: data.slice(-1),
        };

        expect(groupBy(data, "userId")).toEqual(expected);
    });

    test("by key resolver", () => {
        const expected = {
            "User-1": data.slice(0, 3),
            "User-2": data.slice(-1),
        };

        expect(groupBy(data, "userId", (value => `User-${value}`))).toEqual(expected);
    });

});
