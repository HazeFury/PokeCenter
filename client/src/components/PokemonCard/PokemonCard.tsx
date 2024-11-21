import { Link } from "react-router-dom";
import "./PokemonCard.css";
import { useTheme } from "../../contexts/ThemeContext";

interface PokemonDataProps {
  pokemonData: {
    id: number;
    name: string;
    image: string;
    sprite: string;
  };
}

const PokemonCard = ({ pokemonData }: PokemonDataProps) => {
  const { theme } = useTheme();
  return (
    <Link to={`/pokemon/${pokemonData.id}`}>
      <figure
        className={`pokemon_box ${
          theme === "light" ? "light_theme" : "dark_theme"
        }`}
      >
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
