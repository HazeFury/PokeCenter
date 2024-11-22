import { Link } from "react-router-dom";
import PokeLogo from "../../assets/images/pokeball.png";

import "./Header.css";
import ToggleTheme from "../ToggleTheme/ToggleTheme";

const Header = () => {
  return (
    <nav>
      <div className="flex">
        <img src={PokeLogo} alt="pokeball_logo" className="poke_logo" />
        <h1 className="jadielle_center">Pokemon Health Center</h1>
      </div>
      <section>
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
    </nav>
  );
};

export default Header;
