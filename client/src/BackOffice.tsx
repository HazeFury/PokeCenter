import { Outlet } from "react-router-dom";
import "./BackOffice.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { useTheme } from "./contexts/ThemeContext";

function BackOffice() {
  const { theme } = useTheme();

  return (
    <>
      <Header />
      <header />

      <main className={theme === "light" ? "light_theme" : "dark_theme"}>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default BackOffice;
