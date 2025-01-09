import "./Register.css";

const allPokemonTypes = [
  { id: 1, type: "Eau" },
  { id: 2, type: "Feu" },
  { id: 3, type: "Plante" },
  { id: 4, type: "Électrik" },
  { id: 5, type: "Normal" },
  { id: 6, type: "Vol" },
  { id: 7, type: "Poison" },
  { id: 8, type: "Insecte" },
  { id: 9, type: "Sol" },
  { id: 10, type: "Roche" },
  { id: 11, type: "Acier" },
  { id: 12, type: "Psy" },
  { id: 13, type: "Ténèbres" },
  { id: 14, type: "Spectre" },
  { id: 15, type: "Glace" },
  { id: 16, type: "Dragon" },
  { id: 17, type: "Fée" },
];

const Register = () => {
  return (
    <form className="register_form">
      <label htmlFor="email">Adresse email</label>
      <input type="email" name="email" />

      <label htmlFor="password">Mot de passe</label>
      <input type="password" name="password" />

      <label htmlFor="name">Nom</label>
      <input type="text" name="name" />

      <label htmlFor="origin">Ville d'origine</label>
      <input type="text" name="origin" />

      <label htmlFor="favorite_type">Votre type favoris</label>
      <select name="favorite_type">
        <option value={undefined}>-- Veuillez selectionner --</option>
        {allPokemonTypes.map((type) => (
          <option key={type.id} value={type.type}>
            {type.type}
          </option>
        ))}
      </select>

      <input type="submit" value={"Créer mon compte"} />
    </form>
  );
};

export default Register;
