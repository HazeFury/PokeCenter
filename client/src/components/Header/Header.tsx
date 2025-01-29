import { Link, useNavigate } from "react-router-dom";
import UserConnectedIcon from "../../assets/icons/user-connected.svg";
import UserIcon from "../../assets/icons/user.svg";
import PokeLogo from "../../assets/images/pokeball.png";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import "./Header.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import ToggleTheme from "../ToggleTheme/ToggleTheme";
import Modal from "../UI-components/Modal/Modal";

const Header = () => {
  const { auth, logout } = useAuth();
  const [logoutMenu, setLogoutMenu] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  // ------- LOGOUT FUNCTIONS  -----------------
  const handleOpenLogoutMenu = () => {
    setLogoutMenu(!logoutMenu);
  };

  const handleLogout = () => {
    handleOpenLogoutMenu();
    logout();
  };
  // ------- DELETE ACCOUNT FUNCTIONS  -----------------

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDeletePokemon = () => {
    if (auth === null) {
      toast.error("Vous devez être connecté pour soigner un pokémon");
      return;
    }
    fetch(`${import.meta.env.VITE_API_URL}/api/account`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth !== null ? auth.token : ""}`,
      },
    }).then((res) => {
      if (res.status === 204) {
        logout();
        toast.info("Adieu jeune dresseur !");
        navigate("/");
      } else if (res.status === 401) {
        toast.error("Vous n'avez pas le droit d'effectuer cette action !");
      } else {
        toast.error("Un problème est survenu, veuillez réessayer");
      }
    });
  };

  useEffect(() => {
    if (logoutMenu === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }
  }, [logoutMenu]);

  // -------------------------------------------

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
        <div className="toggle_container">
          {auth === null ? (
            <Link to="/backoffice/login">
              <div className="user_icon white_border">
                <img src={UserIcon} alt="user logo" />
              </div>
            </Link>
          ) : (
            <button
              type="button"
              className="logout_btn"
              onClick={handleOpenLogoutMenu}
            >
              <div className="user_icon green_border">
                <img src={UserConnectedIcon} alt="user logo with checkbox" />
              </div>
            </button>
          )}
        </div>
        {logoutMenu === true && (
          <div className="logout_box">
            <p>{auth?.user.name}</p>
            <button
              type="button"
              className="login_link"
              onClick={handleOpenModal}
            >
              Supprimer le compte
            </button>
            <button type="button" className="login_link" onClick={handleLogout}>
              Déconnexion
            </button>
          </div>
        )}
        {openModal && true && (
          <Modal
            action={handleDeletePokemon}
            closeModal={handleCloseModal}
            modalText={"Êtes-vous sûr de supprimer votre compte ?"}
          />
        )}
      </section>
      <section className="mobile_display">
        <BurgerMenu />
      </section>
    </nav>
  );
};

export default Header;
