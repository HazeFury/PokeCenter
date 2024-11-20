import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Pokemon {
  id: number;
  name: string;
  image: string;
}

const PokemonPage = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null); // Utilisation de null comme valeur initiale
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://pokebuildapi.fr/api/v1/pokemon/${id}`)
      .then((res) => res.json())
      .then((data) => setPokemon(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img src={pokemon.image} alt={pokemon.name} />
      <h1>{pokemon.name}</h1>
    </div>
  );
};

export default PokemonPage;
