import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type PokemonToHealType = {
  id: number;
  pokedex_id: number;
  pokemon_pseudo: string;
  pokemon_owner: string;
  health_left: number;
};

class PokemonHealRepository {
  table: string;
  constructor() {
    this.table = "pokemon_to_heal";
  }
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      `select heal.* , pok.image, pok.health from ${this.table} as heal
       join pokedex as pok on heal.pokedex_id = pok.id order by heal.id desc`,
    );

    return rows as PokemonToHealType[];
  }

  async create(newPokemon: Omit<PokemonToHealType, "id">) {
    const [result] = await databaseClient.query<Result>(
      `insert into ${this.table} (pokedex_id, pokemon_pseudo, pokemon_owner, health_left) values (?, ?, ?, ?)`,
      [
        newPokemon.pokedex_id,
        newPokemon.pokemon_pseudo,
        newPokemon.pokemon_owner,
        newPokemon.health_left,
      ],
    );

    return result.insertId;
  }
}

export default new PokemonHealRepository();
