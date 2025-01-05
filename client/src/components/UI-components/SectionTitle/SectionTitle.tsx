import { useTheme } from "../../../contexts/ThemeContext";
import "./SectionTitle.css";

interface SectionTitleProps {
  title: string;
  description: string;
}

const SectionTitle = ({ title, description }: SectionTitleProps) => {
  const { theme } = useTheme();

  return (
    <div
      className={`section_detail ${
        theme === "light" ? "light_theme" : "dark_theme"
      }`}
    >
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default SectionTitle;
