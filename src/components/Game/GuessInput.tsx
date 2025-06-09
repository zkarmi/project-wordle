import { useEffect, useRef, useState } from "react";
import { GUESS_LENGTH, NUM_OF_GUESSES_ALLOWED } from "../../constants";
import { GameState } from "../../types";

type GuessInputProps = {
  handleGuess: (guess: string) => boolean;
  gameState: GameState | null;
}

function GuessInput({handleGuess, gameState}: GuessInputProps) {
  // state
  const [currentGuess, setCurrentGuess] = useState('');

  // refs
  const inputRef = useRef<HTMLInputElement>(null);

  // handlers
  const submitGuess = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(
      currentGuess.length < GUESS_LENGTH ||
      gameState
    ) return;

    if(handleGuess(currentGuess)) {
      setCurrentGuess('');
    }
  }

  // side effects
  useEffect(() => {
    if(gameState === null) {
      inputRef.current?.focus();
    }
  }, [gameState]);

  return (
    <form onSubmit={submitGuess} className="guess-input-wrapper">
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        type="text"
        id="guess-input"
        value={currentGuess}
        onChange={(e) => {
          setCurrentGuess(e.target.value.replace(/[^a-zA-Z]/g, '').toUpperCase())
        }}
        ref={inputRef}
        maxLength={5}
        autoComplete="off"
        spellCheck={false}
        pattern={`[a-zA-Z]{${GUESS_LENGTH}}`} /* redundant given the .replace(), but using just to practice */
        disabled={gameState !== null}
      />
    </form>
  );
}

export default GuessInput;
