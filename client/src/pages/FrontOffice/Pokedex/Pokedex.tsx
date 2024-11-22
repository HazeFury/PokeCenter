import { useEffect, useState } from "react";
import PokemonCard from "../../../components/PokemonCard/PokemonCard";
import EmptyPage from "../../../components/UI-components/EmptyPage/EmptyPage";
import ErrorMessage from "../../../components/UI-components/ErrorMessage/ErrorMessage";
import Loader from "../../../components/UI-components/Loader/Loader";
import { useTheme } from "../../../contexts/ThemeContext";
import "./Pokedex.css";

interface PokemonProps {
  id: number;
  name: string;
  image: string;
  sprite: string;
}

const Pokedex = () => {
  const [pokemons, setPokemons] = useState<PokemonProps[] | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    fetch("https://pokebuildapi.fr/api/v1/pokemon/limit/151")
      .then((res) => res.json())
      .then((data) => setPokemons(data))
      .catch((err) => {
        setPokemons([]); // En cas d'erreur, je met mon state pokemons à tableau vide
        // pour le différencier de sa valeur initial qui vaut null et ainsi sortir du loader
        console.error(err);
      });
  }, []);

  if (!pokemons) {
    // Gestion du cas où les données ne sont pas encore disponibles
    return (
      <EmptyPage>
        <Loader />
      </EmptyPage>
    );
  }

  return (
    <>
      <div
        className={`section_detail ${
          theme === "light" ? "light_theme" : "dark_theme"
        }`}
      >
        <h1>Pokedex</h1>
        <p>Trouvez ici toutes les informations sur les Pokemon</p>
      </div>
      <section className="pokedex_section">
        {pokemons.length > 1 ? (
          pokemons.map((pokemon) => (
            <PokemonCard pokemonData={pokemon} key={pokemon.id} />
          ))
        ) : (
          // Affiche un message en cas d'erreur
          <EmptyPage>
            <ErrorMessage text="Un problème est survenu !" />
          </EmptyPage>
        )}
      </section>
    </>
  );
};

export default Pokedex;
