import "./Login.css";
import { useRef } from "react";
import type { FormEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../contexts/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/login`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: (emailRef.current as HTMLInputElement).value,
            password: (passwordRef.current as HTMLInputElement).value,
          }),
        },
      );

      // Redirection vers la page de connexion si la création réussit
      if (response.status === 200) {
        const user = await response.json();
        login(user);
        toast.success(`Hello ${user.user.name}, content de te revoir ! 😊`);
        navigate("/backoffice/action");
      } else {
        toast.error("Une erreur s'est produite, veuillez réessayer");
        console.info(response);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <form className="login_form" onSubmit={handleSubmit}>
      <label htmlFor="email">Adresse email</label>
      <input type="email" name="email" ref={emailRef} placeholder="email" />
      <label htmlFor="password">Mot de passe</label>
      <input
        type="password"
        name="password"
        ref={passwordRef}
        placeholder="mot de passe"
      />
      <input type="submit" value={"Se connecter"} />
    </form>
  );
};

export default Login;
