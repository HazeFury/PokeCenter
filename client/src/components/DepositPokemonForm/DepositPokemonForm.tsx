import { useState } from "react";
import { diplayLifeColor } from "../../utils/diplayLifeColor";
import "./DepositPokemonForm.css";
import { useTheme } from "../../contexts/ThemeContext";

interface DepositPokemonFormProps {
  pokedexData: {
    id: number;
    name: string;
    health: number;
    sprite: string;
  }[];
  refreshData: () => void;
}

type pokemonData = {
  id: number;
  name: string;
  health: number;
  sprite: string;
};

const DepositPokemonForm = ({
  pokedexData,
  refreshData,
}: DepositPokemonFormProps) => {
  // #################  STATE  #############################
  const [selectedPokemon, setSelectedPokemon] = useState<
    undefined | pokemonData
  >(undefined);

  const [pokeForm, setPokeForm] = useState({
    pokemon_pseudo: "",
    pokemon_owner: "",
    health_left: "0",
  });

  const { theme } = useTheme();

  // #################  FONCTION  #############################
  // => sert à afficher des 0 pour que l'id des pokemon dans le <select> soit toujours composé de 3 chiffres
  const displayNumber = (num: number) => {
    if (num < 10) {
      return `00${num}`;
    }
    if (num >= 10 && num < 100) {
      return `0${num}`;
    }
    return num;
  };

  // fonction pour remplir le state lié au formulaire
  const handleFillForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPokeForm({ ...pokeForm, [e.target.name]: e.target.value });
  };

  // fonction pour placer le pokemon choisis dans un state et ainsi afficher les autres champs du formulaire
  const handleChoosePokemon = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const choosenId = Number.parseInt(e.target.value);

    const choosenPokemonData = pokedexData.find(
      (pokemon) => pokemon.id === choosenId,
    );

    setSelectedPokemon(choosenPokemonData);
    setPokeForm({ ...pokeForm, health_left: "0" });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newPokemonToHeal = {
      pokemon_id: selectedPokemon?.id,
      pokemon_pseudo: pokeForm.pokemon_pseudo,
      pokemon_owner: pokeForm.pokemon_owner,
      health_left: Number.parseInt(pokeForm.health_left),
    };

    fetch(`${import.meta.env.VITE_API_URL}/api/new-pokemon-to-heal`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPokemonToHeal),
    })
      .then((response) => response.json())
      .then(() => {
        setSelectedPokemon(undefined);
        refreshData();
      });
  };

  // #################  VARIABLE  #############################
  // => raccourci pour pour savoir si la vie du pokemon qu'on veut placer
  // est égale à sa vie maximum (afin de désactiver le bouton submit)
  const isPokemonHasMaxLife =
    selectedPokemon !== undefined &&
    selectedPokemon.health - Number.parseInt(pokeForm.health_left) === 0;

  // #################  RENDU  #############################

  return (
    <form
      onSubmit={handleSubmit}
      className={`deposit_form ${
        theme === "light" ? "light_theme" : "dark_theme"
      }`}
    >
      <label
        htmlFor="pokemon_id"
        className={theme === "light" ? "light_theme" : "dark_theme"}
      >
        Quelle est votre Pokémon :
      </label>
      <select name="pokemon_id" id="pokemon_id" onChange={handleChoosePokemon}>
        <option value={undefined}>CHOISISSEZ VOTRE POKEMON</option>
        {pokedexData.map((pokemon) => (
          <option key={pokemon.id} value={pokemon.id}>
            {displayNumber(pokemon.id)} - {pokemon.name}
          </option>
        ))}
      </select>
      {selectedPokemon !== undefined && (
        <>
          <img src={selectedPokemon.sprite} alt={selectedPokemon.name} />
          <label htmlFor="trainerName">
            Entrez le surnom de votre Pokemon :
          </label>
          <input
            type="text"
            id="pokemon_pseudo"
            name="pokemon_pseudo"
            onChange={handleFillForm}
          />
          <label htmlFor="pokemon_owner">Entrez votre nom :</label>
          <input
            type="text"
            id="pokemon_owner"
            name="pokemon_owner"
            onChange={handleFillForm}
          />
          <label htmlFor="pokemon_owner">
            Point de vie restant à votre Pokemon
          </label>
          <input
            type="range"
            id="health_left"
            name="health_left"
            min={0}
            max={selectedPokemon.health}
            value={pokeForm.health_left}
            onChange={handleFillForm}
          />
          <p className="health_point">
            PV :{" "}
            <span
              className={diplayLifeColor(
                Number.parseInt(pokeForm.health_left),
                selectedPokemon.health,
              )}
            >
              {pokeForm.health_left} / {selectedPokemon.health}
            </span>
          </p>
          {isPokemonHasMaxLife === true && (
            <p className="red_text">Votre Pokémon est déjà plein de vie !</p>
          )}
          <button type="submit" disabled={isPokemonHasMaxLife}>
            Déposer son pokemon
          </button>
        </>
      )}
    </form>
  );
};

export default DepositPokemonForm;
