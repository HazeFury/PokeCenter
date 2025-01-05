import { useEffect, useState } from "react";

import "./Home.css";
import DepositPokemonForm from "../../../components/DepositPokemonForm/DepositPokemonForm";
import EmptyPage from "../../../components/UI-components/EmptyPage/EmptyPage";
import ErrorMessage from "../../../components/UI-components/ErrorMessage/ErrorMessage";
import Loader from "../../../components/UI-components/Loader/Loader";
import SectionTitle from "../../../components/UI-components/SectionTitle/SectionTitle";
import WaitHealingCard from "../../../components/WaitHealingCard/WaitHealingCard";

interface PokemonToHealType {
  id: number;
  pokemon_pseudo: string;
  pokemon_owner: string;
  health: number;
  health_left: number;
  image: string;
  name: string;
}

interface PokedexType {
  id: number;
  name: string;
  health: number;
  sprite: string;
}

const Home = () => {
  const [pokedex, setPokedex] = useState<PokedexType[] | null>(null);
  const [pokemonsToHeal, setPokemonsToHeal] = useState<
    PokemonToHealType[] | null
  >(null);

  useEffect(() => {
    fetch("http://localhost:3310/api/pokemon-to-heal")
      .then((res) => res.json())
      .then((data) => setPokemonsToHeal(data))
      .catch((err) => {
        setPokemonsToHeal([]); // En cas d'erreur, je met mon state pokemons à tableau vide
        // pour le différencier de sa valeur initial qui vaut null et ainsi sortir du loader
        console.error(err);
      });
  }, []);
  useEffect(() => {
    fetch("http://localhost:3310/api/pokedex")
      .then((res) => res.json())
      .then((data) => setPokedex(data))
      .catch((err) => {
        setPokedex([]); // En cas d'erreur, je met mon state pokemons à tableau vide
        // pour le différencier de sa valeur initial qui vaut null et ainsi sortir du loader
        console.error(err);
      });
  }, []);

  if (!pokedex || !pokemonsToHeal) {
    // Gestion du cas où les données ne sont pas encore disponibles
    return (
      <EmptyPage>
        <Loader />
      </EmptyPage>
    );
  }

  if (pokedex.length === 0) {
    // Gestion du cas où il n'y pas les infos du pokedex
    return (
      <>
        <header />
        <EmptyPage>
          <ErrorMessage text="Un problème est survenu ! Revenez plus tard." />
        </EmptyPage>
      </>
    );
  }

  return (
    <>
      <header />

      <SectionTitle
        title="Accueil"
        description="Bienvenue au centre de soin. Confiez-nous vos Pokémon afin que nous les soignons."
      />
      <DepositPokemonForm pokedexData={pokedex} />
      <SectionTitle
        title="File d'attente"
        description="Voici la liste des Pokemons que nous allons soigner prochainement."
      />
      <section className="pokemons_to_heal_section">
        {pokemonsToHeal?.map((pokemonToHeal) => (
          <WaitHealingCard data={pokemonToHeal} key={pokemonToHeal.id} />
        ))}
      </section>
    </>
  );
};

export default Home;
