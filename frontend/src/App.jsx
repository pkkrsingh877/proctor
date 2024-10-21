import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import './App.css'

const socket = io('http://localhost:3001');

const App = () => {
  const [playerId, setPlayerId] = useState(null);
  const [playerChoice, setPlayerChoice] = useState(null);
  const [opponentChoice, setOpponentChoice] = useState(null);
  const [result, setResult] = useState('');

  useEffect(() => {
    socket.on('playerAssigned', (data) => {
      setPlayerId(data.id);
    });

    socket.on('revealChoices', (choices) => {
      const [player1, player2] = Object.keys(choices);
      const player1Choice = choices[player1];
      const player2Choice = choices[player2];

      if(playerId == player1){
        setPlayerChoice(player1Choice);
        setOpponentChoice(player2Choice);
      }else{
        setPlayerChoice(player2Choice);
        setOpponentChoice(player2Choice);
      }

      determineWinner(player1Choice, player2Choice);
    });

    return () => {
      socket.off('playerAssigned');
      socket.off('revealChoices');
    };
  }, [playerId]);

  const determineWinner = (choice1, choice2) => {
    if(choice1 == choice2){
      setResult("It's a draw!");
    }else if((choice1 == 'rock' && choice2 == 'scissors') || (choice1 == 'scissors' && choice2 == 'paper') || (choice1 == 'paper' && choice2 == 'rock')){
      setResult('You win!');
    }else{
      setResult('You lose!');
    }
  };

  const handleChoice = (choice) => {
    setPlayerChoice(choice);
    socket.emit('playerChoice', choice);
  };

  return (
    <div className='App'>
      <h1>Online Rock Paper Scissors</h1>

      <div>
        <button onClick={() => handleChoice('rock')}>Rock</button>
        <button onClick={() => handleChoice('paper')}>Paper</button>
        <button onClick={() => handleChoice('scissors')}>Scissors</button>
      </div>

      <div>
        <h2>Your Choice: {playerChoice}</h2>
        <h2>Opponent's Choice: {opponentChoice}</h2>
      </div>

      <div>
        <h2>{result}</h2>
      </div>
    </div>
  );
};

export default App;