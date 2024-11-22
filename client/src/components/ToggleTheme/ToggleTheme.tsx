import { useTheme } from "../../contexts/ThemeContext";
import "./ToggleTheme.css";

const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();

  const handleChangeTheme = () => {
    // if (theme === "light") {
    //   setTheme("dark");
    // } else {
    //   setTheme("light");
    // }
    // les lignes ci-dessus peuvent être simplifier en une ternaire ci-dessous :
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <label className="switch">
      <input type="checkbox" onChange={handleChangeTheme} value={theme} />
      <span className="slider" />
    </label>
  );
};

export default ToggleTheme;
