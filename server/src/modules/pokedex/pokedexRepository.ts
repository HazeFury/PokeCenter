import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type PokedexType = {
  id: number;
  name: string;
  image: string;
  sprite: string;
  type: string;
  health: number;
  attack: number;
  defense: number;
};

class PokedexRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from pokedex");

    return rows as PokedexType[];
  }
}

export default new PokedexRepository();
