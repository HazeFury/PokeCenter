// import { useState } from "react";
import "./Login.css";

const Login = () => {
  // const [choiceIsLogin, setChoiceIsLogin] = useState(true);
  return (
    <section className="login_choice">
      <button type="button" className="login_choice_btn">
        Se connecter
      </button>
      <button type="button" className="login_choice_btn">
        S'enregistrer
      </button>
    </section>
  );
};

export default Login;
