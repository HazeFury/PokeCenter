import { useLocation } from "react-router-dom";
import { displayLifeColor } from "../../utils/displayLifeColor";
import "./WaitHealingCard.css";
import { useEffect, useState } from "react";
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
  const [healthLeft, setHealthLeft] = useState(data.health_left);
  const [healing, setHealing] = useState(false);
  const location = useLocation();
  const healthPercentage = (healthLeft / data.health) * 100;

  const handleHealPokemon = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/heal-pokemon/${data.id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 201) {
        if (healthLeft < data.health) {
          setHealing(true);
        }
      }
    });
  };

  useEffect(() => {
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

      return () => clearInterval(interval);
    }
  }, [healing, data.health]);

  const displayBorderColor = () => {
    if (healthLeft === 0) {
      return { borderColor: "red" };
    }
    if (healthLeft === data.health) {
      return { borderColor: "#16b816" };
    }
    return { borderColor: "#e0e0e0" };
  };

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
