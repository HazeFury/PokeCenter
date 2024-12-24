import { useState } from "react";
import "./BurgerMenu.css";
import { Link } from "react-router-dom";
import OpenMenu from "../../assets/icons/burger-menu.svg";
import CloseMenu from "../../assets/icons/close.svg";
import ToggleTheme from "../ToggleTheme/ToggleTheme";

const BurgerMenu = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleOpeningMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const handeCloseMenu = () => {
    setIsOpenMenu(false);
  };
  const navigation = [
    { id: 1, url: "/", name: "Home" },
    { id: 2, url: "/pokedex", name: "Pokedex" },
    { id: 3, url: "/backoffice/staff", name: "Staff" },
    { id: 4, url: "/backoffice/action", name: "Action" },
  ];

  return (
    <>
      <button type="button" onClick={handleOpeningMenu} className="menu_btn">
        <img
          className="menu_icon"
          src={isOpenMenu === false ? OpenMenu : CloseMenu}
          alt=""
        />
      </button>

      <div
        className={`opened_menu_container ${
          isOpenMenu === true ? "right_to_left display_flex" : "display_none"
        }`}
      >
        <ul>
          {navigation.map((link) => (
            <li key={link.id} className="list_element_burger">
              <Link
                to={link.url}
                onClick={handeCloseMenu}
                className="mobile_link"
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li className="list_element_burger">
            <Link to="/login" className="login_link">
              Se connecter
            </Link>
          </li>
          <li className="list_element_burger">
            <ToggleTheme />
          </li>
        </ul>
      </div>
    </>
  );
};

export default BurgerMenu;
