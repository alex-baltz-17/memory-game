import React from "react";
import "./index.scss";

const GameButton = ({ onClickEvent, children }) => {
  return (
    <button className="game-button" onClick={onClickEvent}>
      {children}
    </button>
  );
};

export default GameButton;
