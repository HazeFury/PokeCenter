import { useEffect, useState } from "react";
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
const Action = () => {
  const [pokemonsToHeal, setPokemonsToHeal] = useState<
    PokemonToHealType[] | null
  >(null);

  const fetchPokemonToHeal = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/pokemon-to-heal`)
      .then((res) => res.json())
      .then((data) => setPokemonsToHeal(data))
      .catch((err) => {
        setPokemonsToHeal([]); // En cas d'erreur, je met mon state pokemonsToHeal à tableau vide
        // pour le différencier de sa valeur initial qui vaut null et ainsi sortir du loader
        console.error(err);
      });
  };

  useEffect(fetchPokemonToHeal, []);

  return (
    <>
      <SectionTitle
        title="Espace de soin"
        description="Bienvenue dans l'espace de soin. Vous pouvez soignez tous les pokemons en attente de soin."
      />

      <section className="pokemons_to_heal_section">
        {pokemonsToHeal?.map((pokemonToHeal) => (
          <WaitHealingCard data={pokemonToHeal} key={pokemonToHeal.id} />
        ))}
      </section>
    </>
  );
};

export default Action;
