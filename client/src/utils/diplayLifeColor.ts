// fonction pour changer la couleur du texte en fonction de la vie donné en paramètre.
// les strings qui sont retourné sont des classes CSS

export const diplayLifeColor = (
  currentLife: number,
  maxLife: number
): string | undefined => {
  const thirdOfLife = maxLife / 3;
  if (currentLife === 0) {
    return "red";
  }
  if (currentLife > 0 && currentLife <= thirdOfLife) {
    return "orange";
  }
  if (currentLife > thirdOfLife && currentLife <= thirdOfLife * 2) {
    return "yellow";
  }
  if (currentLife > thirdOfLife * 2 && currentLife <= maxLife - 1) {
    return "light_green";
  }
  if (currentLife === maxLife) {
    return "dark_green";
  }
};
