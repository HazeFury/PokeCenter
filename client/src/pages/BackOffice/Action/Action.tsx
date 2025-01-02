const Action = () => {
  return (
    <>
      <h2>Backoffice</h2>
      <h3>Pokemon en attente de soin</h3>
      <form>
        <div>
          <label htmlFor="pokemonList">Liste des Pokémon :</label>
          <select id="pokemonList" name="pokemonList">
            <option value="">Sélectionnez un Pokémon</option>
            <option value="pikachu">Pikachu</option>
            <option value="bulbasaur">Bulbizarre</option>
            <option value="charmander">Salamèche</option>
            <option value="squirtle">Carapuce</option>
          </select>
        </div>
        <div>
          <label htmlFor="priority">Niveau de priorité :</label>
          <select id="priority" name="priority">
            <option value="low">Basse</option>
            <option value="medium">Moyenne</option>
            <option value="high">Élevée</option>
          </select>
        </div>
        <button type="submit">Choisir</button>
      </form>
    </>
  );
};

export default Action;
