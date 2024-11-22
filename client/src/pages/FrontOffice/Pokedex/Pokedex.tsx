import { useEffect, useState } from "react";
import PokemonCard from "../../../components/PokemonCard/PokemonCard";
import { useTheme } from "../../../contexts/ThemeContext";
import "./Pokedex.css";

interface PokemonProps {
  id: number;
  name: string;
  image: string;
  sprite: string;
}

const Pokedex = () => {
  const [pokemons, setpokemons] = useState<PokemonProps[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    fetch("https://pokebuildapi.fr/api/v1/pokemon/limit/151")
      .then((res) => res.json())
      .then((data) => setpokemons(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div
        className={`section_detail ${
          theme === "light" ? "light_theme" : "dark_theme"
        }`}
      >
        <h1>Pokedex</h1>
        <p>Trouvez ici toutes les informations sur les pokemon</p>
      </div>
      <section className="pokedex_section">
        {pokemons.length > 1 ? (
          pokemons.map((pokemon) => (
            <PokemonCard pokemonData={pokemon} key={pokemon.id} />
          ))
        ) : (
          <p>un problème est survenu !</p>
        )}
      </section>
    </>
  );
};

export default Pokedex;
