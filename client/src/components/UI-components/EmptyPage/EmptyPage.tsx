import type { ReactNode } from "react";

interface EmptyPageProps {
  children: ReactNode; // ReactNode est un type qui représente tout ce qu'on peut rendre dans React (JSX, texte, tableau, etc.).
}

// Composant vide qui prend toute la hauteur de la page pour wrapper un composant enfant (children) au centre de la page
const EmptyPage = ({ children }: EmptyPageProps) => {
  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        flexDirection: "column",
      }}
    >
      {children}
    </div>
  );
};

export default EmptyPage;
