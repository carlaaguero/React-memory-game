import { useState } from 'react';
import './App.css'
import SingleCard from './components/SingleCard';

const cardImages = [
  {"src": "/img/diamond-1.png"},
  {"src": "/img/diamond-2.png"},
  {"src": "/img/diamond-3.png"},
  {"src": "/img/diamond-4.png"},
  {"src": "/img/diamond-5.png"},
  {"src": "/img/diamond-6.png"}
]

function App() {
  const [cards, setCards] = useState ([])
  const [turns, setTurns] = useState (0)

// shuffle cards
const shuffleCards = () => {
  const shuffleCards = [...cardImages, ...cardImages]
  .sort(() => Math.random() - 0.5)
  .map((card) => ({ ...card, id: Math.random() }))

  setCards(shuffleCards)
  setTurns(0)
}

console.log(cards, turns)

  return (
    <div className="App">
      <h1>Diamond Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}

export default App