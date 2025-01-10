import "./Login.css";

const Login = () => {
  return (
    <form className="login_form">
      <label htmlFor="email">Adresse email</label>
      <input type="email" name="email" />
      <label htmlFor="password">Mot de passe</label>
      <input type="password" name="password" />
      <input type="submit" value={"Se connecter"} />
    </form>
  );
};

export default Login;
