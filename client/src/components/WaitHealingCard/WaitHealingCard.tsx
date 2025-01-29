import { useLocation } from "react-router-dom";
import { displayLifeColor } from "../../utils/displayLifeColor";
import "./WaitHealingCard.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import HealButton from "../UI-components/HealButton/HealButton";

interface WaitHealingCardProps {
  data: {
    id: number;
    pokemon_pseudo: string;
    pokemon_owner: string;
    health: number;
    health_left: number;
    image: string;
    name: string;
  };
}

const WaitHealingCard = ({ data }: WaitHealingCardProps) => {
  // #################  VARIABLE & STATES  #############################
  const { auth } = useAuth();
  const [healthLeft, setHealthLeft] = useState(data.health_left);
  const [healing, setHealing] = useState(false);
  const location = useLocation();
  const healthPercentage = (healthLeft / data.health) * 100;

  // #################  FONCTION  #############################
  // => fonction pour soigner le pokemon. On commence par faire la requête au back et si l'opération
  // réussi, alors on lance l'animation de guérison
  const handleHealPokemon = () => {
    if (auth === null) {
      toast.error("Vous devez être connecté pour soigner un pokémon");
      return;
    }
    fetch(`${import.meta.env.VITE_API_URL}/api/heal-pokemon/${data.id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth !== null ? auth.token : ""}`,
      },
    }).then((res) => {
      //Si la réponse est bonne (status 201), on se prépare à lancer l'animation
      if (res.status === 204) {
        // si la la vie du pokemon n'est pas au max de ce qu'elle peut être, on passe le state "healing" à true
        if (healthLeft < data.health) {
          setHealing(true);
        }
      } else if (res.status === 401) {
        toast.error("Vous n'avez pas le droit d'effectuer cette action !");
      } else {
        toast.error("Un problème est survenu, veuillez réessayer");
      }
    });
  };

  useEffect(() => {
    // => Si healing vaut true, on lance un interval qui incremente de 1 le state "healthLeft"
    // toute les 0,1 secondes jusqu'à atteindre la santé max du pokemon
    if (healing) {
      const interval = setInterval(() => {
        setHealthLeft((prev) => {
          if (prev < data.health) {
            return Math.min(prev + 1, data.health);
          }
          clearInterval(interval);
          setHealing(false);
          return data.health;
        });
      }, 100);
      // au démontage du composant, on stop l'intervalle pour ne pas consommer de la performance inutilement
      return () => clearInterval(interval);
    }
  }, [healing, data.health]);

  // => fonction pour changer la couleur des bordures en fonction  de la vie du pokemon
  const displayBorderColor = () => {
    if (healthLeft === 0) {
      return { borderColor: "red" }; // bordure rouge quand le pokemon est KO (pv = 0)
    }
    if (healthLeft === data.health) {
      return { borderColor: "#16b816" }; // bordure verte quand la vie du pokemon est pleine
    }
    return { borderColor: "#e0e0e0" }; // bordure blanche normal en dehors des 2 conditions ci-dessus
  };

  // #################  RENDU  #############################
  return (
    <figure className="wait_heal_card" style={displayBorderColor()}>
      <img src={data.image} alt={data.name} />
      <p>
        Surnom : <span>{data.pokemon_pseudo}</span>
      </p>
      <p>
        Propriétaire : <span>{data.pokemon_owner}</span>
      </p>
      <div className="health_bar">
        <span className="health_text">
          {healthLeft} / {data.health}
        </span>
        <div
          className="health_bar_fill"
          style={{
            width: `${healthPercentage}%`,
            backgroundColor: displayLifeColor(healthLeft, data.health),
          }}
        />
      </div>
      {/* On affiche ce bouton uniquement sur la partie backOffice */}
      {location.pathname.startsWith("/backoffice/action") && (
        <HealButton
          fakeLoader={healing}
          onClickAction={handleHealPokemon}
          disable={data.health - healthLeft === 0}
        />
      )}
    </figure>
  );
};

export default WaitHealingCard;
