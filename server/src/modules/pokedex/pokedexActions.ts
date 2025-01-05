import type { RequestHandler } from "express";

import pokedex from "./pokedexRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const pokedexData = await pokedex.readAll();

    res.json(pokedexData);
  } catch (err) {
    next(err);
  }
};

export default { browse };
