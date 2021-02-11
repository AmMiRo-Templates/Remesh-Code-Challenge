const users_router = require("../endpoints/routers/usersRouter");
const users_model = require("../endpoints/models/usersModel");

const request = require("supertest");
const express = require("express");
const server = express();
server.use(express.json());
server.use(users_router);

test("We are in the test environment", () => {
    const env = process.env.DB_ENVIRONMENT;
    expect(env).toBe("testing");
});

describe("GET /users", () => {
    const fake_db = [
        { id: 1, username: "User1", time: Date.now() },
        { id: 2, username: "User2", time: Date.now() },
        { id: 3, username: "User3", time: Date.now() },
    ];

    test("Responds with 200 if successful", async () => {
        users_model.findAllUsers = jest.fn(() => {
            return new Promise((res) => setTimeout(() => res(fake_db), 0));
        });

        const expected_users = fake_db;

        const response = await request(server).get("/");

        expect(response.status).toBe(200);
        expect(response.body).toEqual(expected_users);
        expect(users_model.findAllUsers).toHaveBeenCalledTimes(1);
        users_model.findAllUsers.mockReset();
    });

    test("Responsds with 500 if unsuccessful", async () => {
        users_model.findAllUsers = jest.fn(() => {
            throw { detail: "error" };
        });

        const expected_error = {
            message: "Error getting all users",
        };

        const response = await request(server).get("/");

        expect(response.status).toBe(500);
        expect(response.body).toEqual(expected_error);
        expect(users_model.findAllUsers).toHaveBeenCalledTimes(1);
        users_model.findAllUsers.mockReset();
    });
});

describe("POST /users", () => {
    const new_user = {
        username: "test_user",
    };

    test("Responds with 201 if successful", async () => {
        users_model.createUser = jest.fn(() => {
            return new Promise((res) => setTimeout(() => res(new_user), 0));
        });

        const expected_user = new_user;

        const response = await request(server).post("/");

        expect(response.status).toBe(201);
        expect(response.body).toEqual(expected_user);
        expect(users_model.createUser).toHaveBeenCalledTimes(1);
        users_model.createUser.mockReset();
    });

    test("Responds with 500 if unsuccessful", async () => {
        users_model.createUser = jest.fn(() => {
            throw { detail: "error" };
        });

        const expected_error = {
            message: "There was a problem adding this user.",
        };

        const response = await request(server).post("/");

        expect(response.status).toBe(500);
        expect(response.body).toEqual(expected_error);
        expect(users_model.createUser).toHaveBeenCalledTimes(1);
        users_model.createUser.mockReset();
    });
});
