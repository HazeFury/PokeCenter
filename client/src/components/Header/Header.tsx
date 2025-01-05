import { Link } from "react-router-dom";
import PokeLogo from "../../assets/images/pokeball.png";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import "./Header.css";
import ToggleTheme from "../ToggleTheme/ToggleTheme";

const Header = () => {
  return (
    <nav>
      <div className="flex">
        <img src={PokeLogo} alt="pokeball_logo" className="poke_logo" />
        <h1 className="jadielle_center">
          <span className="red">P</span>okemon <span className="red">H</span>
          ealth <span className="red">C</span>enter
        </h1>
        <h1 className="mobile_jadielle_center red_text">PHC</h1>
      </div>
      <section className="desktop_display">
        <div className="front_office">
          <h2 className="office_text">Front Office</h2>
          <ul className="flex">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/pokedex">Pokedex</Link>
            </li>
          </ul>
        </div>
        <div className="back_office">
          <h2 className="office_text">Back Office</h2>
          <ul className="flex">
            <li>
              <Link to="/backoffice/staff">Staff</Link>
            </li>
            <li>
              <Link to="/backoffice/action">Action</Link>
            </li>
          </ul>
        </div>
        <div className="toggle_container">
          <ToggleTheme />
        </div>
      </section>
      <section className="mobile_display">
        <BurgerMenu />
      </section>
    </nav>
  );
};

export default Header;
