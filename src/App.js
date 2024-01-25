import { useEffect, useState } from 'react';
import './App.css'
import SingleCard from './components/SingleCard';

const cardImages = [
  {"src": "/img/diamond-1.png", matched: false },
  {"src": "/img/diamond-2.png", matched: false},
  {"src": "/img/diamond-3.png", matched: false},
  {"src": "/img/diamond-4.png", matched: false},
  {"src": "/img/diamond-5.png", matched: false},
  {"src": "/img/diamond-6.png", matched: false}
]

function App() {
  const [cards, setCards] = useState ([])
  const [turns, setTurns] = useState (0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

// shuffle cards
const shuffleCards = () => {
  const shuffleCards = [...cardImages, ...cardImages]
  .sort(() => Math.random() - 0.5)
  .map((card) => ({ ...card, id: Math.random() }))

  setCards(shuffleCards)
  setTurns(0)
}

// handle a choice
const handleChoice = (card) => {
  choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
}

//compare 2 selected cards
useEffect(() => {
  if (choiceOne && choiceTwo) {

    if (choiceOne.src === choiceTwo.src) {
      setCards(prevCards => {
        return prevCards.map(card => {
          if (card.src === choiceOne.src) {
            return { ...card, matched: true}
          } else {
            return card
          }
        })
      })
      resetTurn()
    } else {
      setTimeout(() => resetTurn(), 1000)
    }
  }
}, [choiceOne, choiceTwo])

console.log(cards)

//reset choices & increase turn
const resetTurn = () => {
  setChoiceOne(null)
  setChoiceTwo(null)
  setTurns(prevTurns => prevTurns + 1)
}

  return (
    <div className="App">
      <h1>Diamond Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard key={card.id} card={card} handleChoice={handleChoice} flipped={card === choiceOne || card === choiceTwo || card.matched} />
        ))}
      </div>
    </div>
  );
}

export default App