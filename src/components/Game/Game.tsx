import { useEffect, useRef, useState } from 'react';

import { sample } from '../../utils';
import { WORDS } from '../../data';
import { GAME_STATES, GUESS_LENGTH, NUM_OF_GUESSES_ALLOWED } from '../../constants';
import GuessInput from './GuessInput';
import GuessTracker from './GuessTracker';
import { GameState, PartialGuess } from '../../types';
import { checkGuess } from '../../game-helpers';
import GameStateBanner from './GameStateBanner';
import VirtualKeyboard from '../VirtualKeyboard';

// Pick a random word for answer.
const pickAnswer = () => sample(WORDS);

function Game() {
  // state
  const initialGuessState = () => Array(NUM_OF_GUESSES_ALLOWED).fill(' '.repeat(GUESS_LENGTH));
  const [answer, setAnswer] = useState<string>(pickAnswer);
  const [guesses, setGuesses] = useState<PartialGuess[]>(initialGuessState);
  const [gameState, setGameState] = useState<GameState | null>(null);

  // refs
  const numGuesses = useRef(0);

  // handlers
  const handleGuessSubmission = (guess: string): boolean => {
    if(
      numGuesses.current >= NUM_OF_GUESSES_ALLOWED ||
      gameState !== null
    ) return false;

    // Wordle allows duplicate words, but I don't care for that
    if(guess.length === GUESS_LENGTH && !guesses.includes(guess)) {
      const evaluation = checkGuess(guess, answer);

      if(evaluation) {
        // update guesses
        setGuesses(prev => {
          const updatedGuesses = [...prev];
          updatedGuesses[numGuesses.current] = evaluation;
          return updatedGuesses;
        });
        numGuesses.current++;

        // check if win/loss
        if(evaluation.filter(({status}) => status === 'correct').length === GUESS_LENGTH) {
          setGameState(GAME_STATES.WIN);
        } else if(numGuesses.current >= 6) {
          setGameState(GAME_STATES.LOSS);
        }

        return true;
      }
    }

    return false;
  }

  const resetGame = () => {
    setGuesses(initialGuessState());
    numGuesses.current = 0;
    setAnswer(pickAnswer());
    setGameState(null);
  }

  return (
    <>
      {gameState && <button id="restart-game" onClick={resetGame}>Restart</button>}
      <GuessTracker guesses={guesses} />
      <GuessInput handleGuess={handleGuessSubmission} gameState={gameState} />
      {
        gameState && <GameStateBanner
          state={gameState}
          answer={answer}
          numGuesses={numGuesses.current}
        />
      }
      <VirtualKeyboard guesses={guesses} />
    </>
  );
}

export default Game;
