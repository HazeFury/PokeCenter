import { useState } from "react";
import "./LoginPage.css";
import Login from "../../../components/Auth/Login/Login";
import Register from "../../../components/Auth/Register/Register";
import SectionTitle from "../../../components/UI-components/SectionTitle/SectionTitle";

const LoginPage = () => {
  const [choiceIsLogin, setChoiceIsLogin] = useState(true);

  return (
    <>
      <SectionTitle
        title="Connexion"
        description="Bienvenue sur votre espace pour vous connecter ou créer un compte"
      />
      <section className="login_choice">
        <button
          type="button"
          onClick={() => setChoiceIsLogin(true)}
          className={`login_choice_btn ${
            choiceIsLogin === true ? "selected_choice" : "default_choice"
          }`}
        >
          Se connecter
        </button>
        <button
          type="button"
          onClick={() => setChoiceIsLogin(false)}
          className={`login_choice_btn ${
            choiceIsLogin === true ? "default_choice" : "selected_choice"
          }`}
        >
          S'enregistrer
        </button>
      </section>
      <section className="login_container">
        {choiceIsLogin === true ? <Login /> : <Register />}
      </section>
    </>
  );
};

export default LoginPage;
