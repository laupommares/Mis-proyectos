import { useState } from 'react'
import './App.css'
import confetti from "canvas-confetti"

import { Square } from './components/Square.jsx';
import { TURNS } from './constants.js'
import { checkWinnerFrom } from './logic/board.js'
import { WinnerModal } from './components/WinnerModal.jsx'
import { checkEndGame } from './logic/board.js';

function App() {

  const [board, setBoard] = useState(Array(9).fill(null))
  
  const[turn, setTurn] = useState(TURNS.X)
  //Null que no hay ganador y false como empate
  const[winner, setWinner] = useState(null) 



  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const updateBoard = (index) => {
    // No actualizamos esta posición si ya tiene algo
    if(board[index] || winner) return
    // actualizar el tablero
    const newBoard = [... board] 
    newBoard[index] = turn
    setBoard(newBoard)
    // cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // revisar si hay un ganador
    const newWinner = checkWinnerFrom(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    } else if(checkEndGame(newBoard)){
      setWinner(false)
    }

  }

  return (
  <main className='board'>
    <h1>Tic tac toe</h1>
    <button onClick={resetGame}>Empezar de nuevo</button>
    <section className='game'> 
    {
      board.map((square, index) =>{
        return(
          <Square
            key={index}
            index={index}
            updateBoard={updateBoard}>
              {square}
          </Square>
        )
      }) 
    }
    </section>

    <section className='turn'>
    <Square isSelected={turn === TURNS.X}>
      {TURNS.X} 
    </Square>
    <Square isSelected={turn === TURNS.O}>
      {TURNS.O}
      </Square>
    </section>

    <WinnerModal resetGame={resetGame} winner={winner}/>

  </main>
  )
}

export default App
