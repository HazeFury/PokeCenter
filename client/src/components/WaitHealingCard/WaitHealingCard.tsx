import { diplayLifeColor } from "../../utils/diplayLifeColor";
import "./WaitHealingCard.css";

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
  return (
    <figure className="wait_heal_card">
      <img src={data.image} alt={data.name} />
      <p>
        Surnom : <span>{data.pokemon_pseudo}</span>
      </p>
      <p>
        Propriétaire : <span>{data.pokemon_owner}</span>
      </p>
      <p>
        PV :{" "}
        <span className={diplayLifeColor(data.health_left, data.health)}>
          {data.health_left} / {data.health}
        </span>
      </p>
    </figure>
  );
};

export default WaitHealingCard;
