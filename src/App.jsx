import React, { useEffect, useState } from "react";
import "./App.scss";
import GridButton from "./components/GridButton";
import Card from "./components/Card";
import PlayButton from "./components/PlayButton";

const App = () => {
  const [gridStructure, setGridStructure] = useState();
  const [cards, setCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [lockSelection, setLockSelection] = useState(false);
  const handleGrid = (pairs) => {
    setGridStructure(pairs);

    let initialCards = [];
    for (let x = 1; x <= pairs; x++) {
      initialCards.push(
        { id: Math.random() * 100, value: x, matched: false },
        { id: Math.random() * 100, value: x, matched: false }
      );
    }
    setCards(initialCards.sort(() => Math.random() - 0.5));
  };

  const handleChoice = (value) => {
    choiceOne
      ? value.id === choiceOne.id
        ? setChoiceOne(value)
        : setChoiceTwo(value)
      : setChoiceOne(value);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setLockSelection(true);
      if (
        choiceOne.value === choiceTwo.value &&
        choiceOne.id !== choiceTwo.id
      ) {
        setMatchedCards([...matchedCards, choiceOne]);
        setCards((prev) => {
          return prev.map((card) => {
            if (card.value === choiceOne.value) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        setTimeout(() => resetTurn(), 1000);
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setLockSelection(false);
  };

  const restartGame = () => {
    const shuffledCards = [...cards]
      .map((card) => ({
        ...card,
        matched: false,
      }))
      .sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setMatchedCards([]);
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  const playAgain = () => {
    setGridStructure(0);
    setCards([]);
    setMatchedCards([]);
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  return (
    <div className="memory-game-cont">
      <h1>Memory Game</h1>

      {!gridStructure ? (
        <GridButton handleGrid={handleGrid} />
      ) : (
        <>
          <div className={`card-grid by-${gridStructure}`}>
            {cards.map((values, index) => {
              return (
                <Card
                  values={values}
                  handleChoice={handleChoice}
                  key={index}
                  flipped={
                    values === choiceOne ||
                    values === choiceTwo ||
                    values.matched
                  }
                  disabled={lockSelection}
                />
              );
            })}
          </div>
          {matchedCards.length === gridStructure ? (
            <PlayButton onClickEvent={playAgain}>Play Again</PlayButton>
          ) : (
            <PlayButton onClickEvent={restartGame}>Restart Game</PlayButton>
          )}
        </>
      )}
    </div>
  );
};

export default App;
