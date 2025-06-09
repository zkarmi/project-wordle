import { GAME_STATES, QWERTY } from "./constants";

// Used for valid Guess letters & keys
export type ValidKeys = typeof QWERTY[number];

// checkGuess()
export enum GuessLetterStatus {
  Incorrect = 'incorrect',
  Misplaced = 'misplaced',
  Correct = 'correct',
}
export type GuessLetterEval = { letter: ValidKeys, status: GuessLetterStatus};
export type GuessEval = GuessLetterEval[];

// Game guesses
export type PartialGuess = GuessEval | string;

// Game state
export type GameState = (typeof GAME_STATES)[keyof typeof GAME_STATES];

// Virtual Keyboard
export type VKKeysStatuses = Partial<Record<ValidKeys, GuessLetterStatus>>;
