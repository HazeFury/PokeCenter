import AbstractSeeder from "./AbstractSeeder";
import PokedexSeeder from "./PokedexSeeder";

class PokemonHealSeeder extends AbstractSeeder {
  constructor() {
    super({
      table: "pokemon_to_heal",
      truncate: true,
      dependencies: [PokedexSeeder],
    });
  }

  run() {
    for (let i = 0; i < 15; i += 1) {
      const newPokemonToHeal = {
        pokedex_id: Math.floor(Math.random() * 151) + 1,
        pokemon_pseudo: this.faker.person.lastName(),
        pokemon_owner: this.faker.person.firstName(),
        health_left: Math.floor(Math.random() * 10),
      };

      this.insert(newPokemonToHeal);
    }
  }
}

export default PokemonHealSeeder;
