import type { RequestHandler } from "express";

import pokemonHealRepository from "./pokemonHealRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const pokemonToHeal = await pokemonHealRepository.readAll();

    res.json(pokemonToHeal);
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newPokemonToHeal = {
      pokedex_id: req.body.pokemon_id,
      pokemon_pseudo: req.body.pokemon_pseudo,
      pokemon_owner: req.body.pokemon_owner,
      health_left: req.body.health_left,
    };

    // Create the item
    const insertId = await pokemonHealRepository.create(newPokemonToHeal);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

export default { browse, add };
