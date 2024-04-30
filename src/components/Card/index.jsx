import React from "react";
import "./index.scss";
const Card = ({ values, handleChoice, flipped, disabled }) => {
  const { id, value, matched } = values;
  const handleClick = () => {
    console.log(values);
    !disabled && handleChoice(values);
  };

  return (
    <div className={`card ${matched && "hidden"}`} onClick={handleClick}>
      <p className={`${flipped ? "flipped" : ""}`}>{value}</p>
    </div>
  );
};

export default Card;
