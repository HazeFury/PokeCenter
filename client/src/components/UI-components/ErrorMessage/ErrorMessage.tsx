import Sad from "../../../assets/images/sad-pikachu.png";

interface ErrorMessageProps {
  text: string;
}

// Composant à afficher en cas d'erreur
const ErrorMessage = ({ text }: ErrorMessageProps) => {
  return (
    <>
      <img src={Sad} alt="Pikachu triste" />
      <p className="error_text" style={{ marginBottom: "20px" }}>
        {text}
      </p>
    </>
  );
};

export default ErrorMessage;
