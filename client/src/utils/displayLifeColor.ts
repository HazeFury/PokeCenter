// fonction qui renvoie une couleur en fonction d'une vie entrante par rapport à une vie maximum

export const displayLifeColor = (
  currentLife: number,
  maxLife: number,
): string => {
  const thirdOfLife = maxLife / 3;
  if (currentLife === 0) {
    return "#e0e0e0"; // Grey for empty
  }
  if (currentLife > 0 && currentLife <= thirdOfLife) {
    return "#fa9f1a"; // Orange
  }
  if (currentLife > thirdOfLife && currentLife <= thirdOfLife * 2) {
    return "#c6bc28"; // Yellow
  }
  if (currentLife > thirdOfLife * 2 && currentLife < maxLife) {
    return "#52ea52"; // Light green
  }
  if (currentLife === maxLife) {
    return "#16b816"; // Dark green
  }
  return "#e0e0e0"; // Default grey
};
