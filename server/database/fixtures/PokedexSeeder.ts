import AbstractSeeder from "./AbstractSeeder";

class PokedexSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "pokedex", truncate: true });
  }

  async run() {
    try {
      const allPokemons = await fetch(
        "https://pokebuildapi.fr/api/v1/pokemon/limit/151",
      );

      const response = await allPokemons.json();

      if (response) {
        for (let i = 0; i < response.length; i += 1) {
          const pokemon = {
            name: response[i].name,
            image: response[i].image,
            sprite: response[i].sprite,
            type: response[i].apiTypes[0].name,
            health: response[i].stats.HP,
            attack: response[i].stats.attack,
            defense: response[i].stats.defense,
          };

          // Insert each pokemon data into the 'pokedex' table
          this.insert(pokemon);
        }
      }
    } catch (err) {
      console.error("===> Problem in PokedexSeeder :", err);
    }
  }
}

export default PokedexSeeder;
