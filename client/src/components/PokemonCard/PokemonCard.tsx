import { Link } from "react-router-dom";
import "./PokemonCard.css";

interface PokemonDataProps {
  pokemonData: {
    id: number;
    name: string;
    image: string;
    sprite: string;
  };
}

const PokemonCard = ({ pokemonData }: PokemonDataProps) => {
  return (
    <Link to={`/pokemon/${pokemonData.id}`}>
      <figure className="pokemon_box">
        <img
          src={pokemonData.sprite}
          alt={pokemonData.name}
          className="pokemon_img"
        />
        <p>{pokemonData.name}</p>
      </figure>
    </Link>
  );
};

export default PokemonCard;
