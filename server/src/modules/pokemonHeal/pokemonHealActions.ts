import type { RequestHandler } from "express";

import pokemonHeal from "./pokemonHealRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const pokemonToHeal = await pokemonHeal.readAll();

    res.json(pokemonToHeal);
  } catch (err) {
    next(err);
  }
};

export default { browse };
