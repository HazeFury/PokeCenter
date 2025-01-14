import "./Login.css";
import { useRef } from "react";
import type { FormEventHandler } from "react";

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    try {
      const loginData = {
        email:
          /* rendering process ensures the ref is defined before the form is submitted */
          (emailRef.current as HTMLInputElement).value,
        password:
          /* rendering process ensures the ref is defined before the form is submitted */
          (passwordRef.current as HTMLInputElement).value,
      };

      console.info(loginData);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <form className="login_form" onSubmit={handleSubmit}>
      <label htmlFor="email">Adresse email</label>
      <input type="email" name="email" ref={emailRef} />
      <label htmlFor="password">Mot de passe</label>
      <input type="password" name="password" ref={passwordRef} />
      <input type="submit" value={"Se connecter"} />
    </form>
  );
};

export default Login;
