import "./StaffCard.css";
import { useTheme } from "../../contexts/ThemeContext";

interface StaffDataProps {
  staffData: {
    id: number;
    name: string;
    origin: string;
    image: string;
    favorite_type: string;
  };
}

const StaffCard = ({ staffData }: StaffDataProps) => {
  const { theme } = useTheme();
  return (
    <figure
      className={`staff_box ${
        theme === "light" ? "light_theme" : "dark_theme"
      }`}
    >
      <img src={staffData.image} alt={staffData.name} className="staff_img" />
      <p id="staff_name">{staffData.name}</p>
      <p>
        Origine : <span className="red_text">{staffData.origin}</span>
      </p>
      <p>
        Type préféré :{" "}
        <span className="red_text">{staffData.favorite_type}</span>
      </p>
    </figure>
  );
};

export default StaffCard;