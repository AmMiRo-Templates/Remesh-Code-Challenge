const conversations_router = require("../endpoints/routers/conversationsRouter");
const conversations_model = require("../endpoints/models/conversationsModel");

const request = require("supertest");
const express = require("express");
const server = express();
server.use(express.json());
server.use(conversations_router);

test("We are in the test environment", () => {
    const env = process.env.DB_ENVIRONMENT;
    expect(env).toBe("testing");
});

describe("GET /conversations", () => {
    const fake_db = [
        { id: 1, user_id: 1, title: "Convo1", time: Date.now() },
        { id: 2, user_id: 1, title: "Convo2", time: Date.now() },
        { id: 3, user_id: 1, title: "Convo3", time: Date.now() },
    ];

    test("Responds with 200 if successful", async () => {
        conversations_model.findAllCoversations = jest.fn(() => {
            return new Promise((res) => setTimeout(() => res(fake_db), 0));
        });

        const expected_conversations = fake_db;

        const response = await request(server).get("/");

        expect(response.status).toBe(200);
        expect(response.body).toEqual(expected_conversations);
        expect(conversations_model.findAllCoversations).toHaveBeenCalledTimes(
            1
        );
        conversations_model.findAllCoversations.mockReset();
    });

    test("Responsds with 500 if unsuccessful", async () => {
        conversations_model.findAllCoversations = jest.fn(() => {
            throw { detail: "error" };
        });

        const expected_error = {
            message: "Error getting all conversations",
        };

        const response = await request(server).get("/");

        expect(response.status).toBe(500);
        expect(response.body).toEqual(expected_error);
        expect(conversations_model.findAllCoversations).toHaveBeenCalledTimes(
            1
        );
        conversations_model.findAllCoversations.mockReset();
    });
});

describe("POST /conversations", () => {
    const new_conversation = {
        user_id: 1,
        title: "test_conversation",
    };

    test("Responds with 201 if successful", async () => {
        conversations_model.createConversation = jest.fn(() => {
            return new Promise((res) =>
                setTimeout(() => res(new_conversation), 0)
            );
        });

        const expected_conversation = new_conversation;

        const response = await request(server).post("/");

        expect(response.status).toBe(201);
        expect(response.body).toEqual(expected_conversation);
        expect(conversations_model.createConversation).toHaveBeenCalledTimes(1);
        conversations_model.createConversation.mockReset();
    });

    test("Responds with 500 if unsuccessful", async () => {
        conversations_model.createConversation = jest.fn(() => {
            throw { detail: "error" };
        });

        const expected_error = {
            message: "There was a problem adding this conversation.",
        };

        const response = await request(server).post("/");

        expect(response.status).toBe(500);
        expect(response.body).toEqual(expected_error);
        expect(conversations_model.createConversation).toHaveBeenCalledTimes(1);
        conversations_model.createConversation.mockReset();
    });
});
