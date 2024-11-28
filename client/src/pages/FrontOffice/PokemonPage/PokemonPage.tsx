import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EmptyPage from "../../../components/UI-components/EmptyPage/EmptyPage";
import ErrorMessage from "../../../components/UI-components/ErrorMessage/ErrorMessage";
import Loader from "../../../components/UI-components/Loader/Loader";
import "./PokemonPage.css";

interface Pokemon {
  id: number;
  name: string;
  image: string;
  stats: {
    HP: number;
    attack: number;
    defense: number;
    special_attack: number;
    special_defense: number;
    speed: number;
  };
}

const PokemonPage = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null | undefined>(null); // Utilisation de null comme valeur initiale
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://pokebuildapi.fr/api/v1/pokemon/${id}`)
      .then((res) => res.json())
      .then((data) => setPokemon(data))
      .catch((err) => {
        setPokemon(undefined);
        console.error(err);
      });
  }, [id]);

  if (pokemon === null) {
    // Gestion du cas où les données ne sont pas encore disponibles
    return (
      <EmptyPage>
        <Loader />
      </EmptyPage>
    );
  }

  return (
    <>
      {pokemon !== undefined ? (
        <section className="pokemon_page_container">
          <img src={pokemon.image} alt={pokemon.name} />
          <div className="pokemon_infos">
            <h1>{pokemon.name}</h1>
            <p>#{pokemon.id}</p>
            <p>
              Point de vie : <span>{pokemon.stats.HP}</span>
            </p>
            <p>
              Attaque : <span>{pokemon.stats.attack}</span>
            </p>{" "}
            <p>
              Défense : <span>{pokemon.stats.defense}</span>
            </p>{" "}
            <p>
              Vitesse : <span>{pokemon.stats.speed}</span>
            </p>
          </div>
        </section>
      ) : (
        // Affiche un message en cas d'erreur
        <EmptyPage>
          <ErrorMessage text="Un problème est survenu !" />
        </EmptyPage>
      )}
      <div className="back_btn_box">
        <Link to="/pokedex">
          <button type="button" className="back_btn">
            Revenir au pokedex
          </button>
        </Link>
      </div>
    </>
  );
};

export default PokemonPage;
