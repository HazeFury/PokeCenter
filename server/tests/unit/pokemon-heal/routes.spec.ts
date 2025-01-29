// Import the supertest library for making HTTP requests
import supertest from "supertest";

// Import the Express application
import app from "../../../src/app";

// Import databaseClient
import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

// Restore all mocked functions after each test
afterEach(() => {
  jest.restoreAllMocks();
});

// Test suite for the GET /api/pokemon route
describe("GET /api/pokemon-to-heal", () => {
  it("should fetch pokemon successfully", async () => {
    // Mock empty rows returned from the database
    const rows = [] as Rows;

    // Mock the implementation of the database query method
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [rows, []]);

    // Send a GET request to the /api/pokemon endpoint
    const response = await supertest(app).get("/api/pokemon-to-heal");

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(rows);
  });
});

// Test suite for the POST /api/pokemon route
// Doesn't pass: maybe something to change in app config :/
describe("POST /api/new-pokemon-to-heal", () => {
  it("should add a new pokemon successfully", async () => {
    // Mock result of the database query
    const result = { insertId: 1 } as Result;

    // Mock the implementation of the database query method
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [result, []]);

    // Fake item data
    const fakePokemon = {
      pokedex_id: 25,
      pokemon_pseudo: "toto",
      pokemon_owner: "Marco",
      health_left: 0,
    };

    // Send a POST request to the /api/pokemon endpoint with a test item
    const response = await supertest(app)
      .post("/api/new-pokemon-to-heal")
      .send(fakePokemon);

    // Assertions
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.insertId).toBe(result.insertId);
  });

  it("should fail on invalid request body", async () => {
    // Mock result of the database query
    const result = {} as unknown as Result;

    // Mock the implementation of the database query method
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [result, []]);

    // Fake item data with missing user_id
    const fakePokemon = {
      pokemon_pseudo: "toto",
      pokemon_owner: "Marco",
    };

    // Send a POST request to the /api/pokemon endpoint with a test item
    const response = await supertest(app)
      .post("/api/new-pokemon-to-heal")
      .send(fakePokemon);

    // Assertions
    expect(response.status).toBe(500);
    expect(response.body).toEqual({});
  });
});
