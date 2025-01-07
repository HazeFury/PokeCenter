import "./HealButton.css";

interface HealButtonProps {
  fakeLoader: boolean;
  onClickAction: () => void;
  disable: boolean;
}

const HealButton = ({
  fakeLoader,
  onClickAction,
  disable,
}: HealButtonProps) => {
  const isFullLife = disable === true ? "Soigné" : "Soigner";
  return (
    <button
      className="heal_btn"
      type="button"
      onClick={onClickAction}
      disabled={disable}
    >
      {fakeLoader === true && <div className="heal_loader" />}
      {fakeLoader === true ? "" : isFullLife}
    </button>
  );
};

export default HealButton;
