import "./Home.css";

const Home = () => {
  return (
    <>
      <h2>Page d'accueil</h2>
      <form>
        <div>
          <label htmlFor="pokemonName">Nom de votre Pokémon :</label>
          <input
            type="text"
            id="pokemonName"
            name="pokemonName"
            placeholder="Entrez le nom de votre Pokémon"
          />
        </div>
        <div>
          <label htmlFor="trainerName">Votre nom :</label>
          <input
            type="text"
            id="trainerName"
            name="trainerName"
            placeholder="Entrez votre nom"
          />
        </div>
        <div>
          <label htmlFor="reason">Raison du soin :</label>
          <textarea
            id="reason"
            name="reason"
            placeholder="Décrivez le problème du Pokémon"
          />
        </div>
        <button type="submit">Déposer son pokemon</button>
      </form>
    </>
  );
};

export default Home;
