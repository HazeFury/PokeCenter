import supertest from "supertest";

import "dotenv/config";

import app from "../../../src/app";

import databaseClient from "../../../database/client";

describe("GET /api/pokemon-to-heal", () => {
  it("should fetch pokemons successfully", async () => {
    const response = await supertest(app).get("/api/pokemon-to-heal");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThanOrEqual(0);
    expect(response.body[0]).toHaveProperty("pokedex_id");
    expect(response.body[0]).toHaveProperty("health_left");
  });
});

// ----------------------------------------------

describe("POST /api/new-pokemon-to-heal", () => {
  it("should add a new pokemon successfully", async () => {
    const fakePokemon = {
      pokemon_id: 25,
      pokemon_pseudo: "tyty",
      pokemon_owner: "Matt",
      health_left: 0,
    };

    const response = await supertest(app)
      .post("/api/new-pokemon-to-heal")
      .send(fakePokemon);

    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.insertId).toBeDefined();
    expect(response.body.insertId).toBe(16);
  });

  it("should fail on invalid request body", async () => {
    const fakePokemon = {
      pokemon_id: null,
      pokemon_pseudo: "tyty",
      pokemon_owner: "Matt",
    };

    const response = await supertest(app)
      .post("/api/new-pokemon-to-heal")
      .send(fakePokemon);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({});
  });
});

afterAll(async () => {
  await databaseClient.end();
});
