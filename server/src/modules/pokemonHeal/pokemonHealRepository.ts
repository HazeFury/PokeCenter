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
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "select heal.* , pok.image, pok.health from pokemon_to_heal as heal join pokedex as pok on heal.pokedex_id = pok.id",
    );

    return rows as PokemonToHealType[];
  }
}

export default new PokemonHealRepository();
