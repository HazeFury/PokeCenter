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

    // Create the pokemon to heal
    const insertId = await pokemonHealRepository.create(newPokemonToHeal);
    if (typeof insertId === "number") {
      res.status(201).json({ insertId });
    } else {
      res.sendStatus(500);
    }
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const idOfPokemonToHeal = Number.parseInt(req.params.id);

    // Heal the pokemon
    const pokemonHealed = await pokemonHealRepository.update(idOfPokemonToHeal);

    if (pokemonHealed === 1) {
      res.status(204).json(pokemonHealed);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, add, edit };
