import { useEffect, useState } from "react";
import PokemonCard from "../../components/PokemonCard/PokemonCard";

interface PokemonProps {
  id: number;
  name: string;
  image: string;
  sprite: string;
}

const Pokedex = () => {
  const [pokemons, setpokemons] = useState<PokemonProps[]>([]);

  useEffect(() => {
    fetch("https://pokebuildapi.fr/api/v1/pokemon/limit/500")
      .then((res) => res.json())
      .then((data) => setpokemons(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="pokedex_section">
      {pokemons.length > 1 ? (
        pokemons.map((pokemon) => (
          <PokemonCard pokemonData={pokemon} key={pokemon.id} />
        ))
      ) : (
        <p>un problème est survenu !</p>
      )}
    </div>
  );
};

export default Pokedex;
