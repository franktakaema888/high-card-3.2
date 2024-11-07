import logo from "/logo.png";
import "./App.css";
import { makeShuffledDeck } from "./utils.jsx";
import { useState } from "react";

// function App(props) {
  function App() {
  // Set default value of card deck to new shuffled deck
  const [cardDeck, setCardDeck] = useState(makeShuffledDeck());

  // currCards holds the cards from the current round (P1 Card and P2 Card)
  const [currCards, setCurrCards] = useState([]);

  // Player 1 Score
  const [p1Score, setP1Score] = useState(0);
  // Player 2 Score
  const [p2Score, setP2Score] = useState(0);

  // Game Message
  const [gameMsg, setGameMsg] = useState("");

  const dealCards = () => {
    // Check that there are enough cards in the deck
    if (cardDeck.length < 2) {
      // Declare the overall game winner
      let finalMessage = "No more cards in deck. ";

      if (p1Score > p2Score) { // Player 1 Wins
        finalMessage += "Player 1 wins";
      } else if (p2Score > p1Score) { // Player 2 Wins
        finalMessage += "Player 2 wins";
      } else { // Players score are the same
        finalMessage += "It's a tie";
      }

      // Update the state of the Game Message
      setGameMsg(finalMessage);
      return;
    }

    // Deal the cards
    const newCurrCards = [cardDeck.pop(), cardDeck.pop()]; // This takes the top two cards from the card deck
    // const {card1, card2} = [cardDeck.pop(), cardDeck.pop()];
    // console.log(newCurrCards);

    // Update the Deck after dealing the cards 
    const newDeck = cardDeck.slice(0, cardDeck.length - 2);
    setCardDeck(newDeck);

    // Update the current hand the players has for that round
    setCurrCards(newCurrCards);

    // Find out the winner for the round
    const card1 = newCurrCards[1]; // Player 1's current card
    const card2 = newCurrCards[0]; // Player 2's current card
    if(card1.rank > card2.rank) {
      setP1Score((score) => score + 1);
      setGameMsg("Player 1 wins")
    } else if (card1.rank < card2.rank) {
      setP2Score((score) => score + 1);
      setGameMsg("Player 2 wins");
    } else {
      setGameMsg("It's a tie");
    }
  };

  // Restart the game
  const restartGame = () => {
    setCardDeck(makeShuffledDeck());
    setCurrCards([]);
    setP1Score(0);
    setP2Score(0);
    setGameMsg("");
  };

  // You can write JavaScript here, just don't try and set your state!

  // You can access your current components state here, as indicated below
  const currCardElems = currCards.map(({name, suit}, index) => (
    // Give each list element a unique key
    <div key={`${name}${suit}`}>
      Player {index + 1}: {name} of {suit}
    </div>
  ));

  return (
    <>
      <div>
        <img src={logo} className="logo" alt="Rocket logo" />
      </div>
      <div className="card">
        <h2>React High Card 🚀</h2>
        <br />
        <p>Player 1 Total Score: {p1Score}</p>
        <p>Player 2 Total Score: {p2Score}</p>
        <br />
        {currCardElems}
        <br />
        {gameMsg}
        <br />
        <button onClick={dealCards}>Deal</button>
        <button onClick={restartGame}>Restart Game</button>
      </div>
    </>
  );
}

export default App;
