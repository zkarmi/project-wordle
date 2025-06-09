import { GUESS_LENGTH, VALID_KEYS_SET } from "./constants";
import { GuessEval, GuessLetterStatus, ValidKeys, VKKeysStatuses } from "./types";

function isValidKey(char: string): char is ValidKeys {
  return VALID_KEYS_SET.has(char as ValidKeys);
}

/**
 * Thanks to Github user dylano for supplying a more-accurate
 * solving algorithm!
 */
export function checkGuess(guess: string, answer: string): GuessEval | null {
  // This constant is a placeholder that indicates we've successfully
  // dealt with this character (it's correct, or misplaced).
  const SOLVED_CHAR = '✓';
  const solvedLetters = Array(GUESS_LENGTH).fill(false);

  if (!guess) {
    return null;
  }

  // validating further up the pipeline
  const guessChars = guess
    .toUpperCase()
    .split('')
    .filter(isValidKey);

  if(guessChars.length !== GUESS_LENGTH) return null;

  const answerChars = answer.split('');

  const result: GuessEval = [];

  // Step 1: Look for correct letters.
  for (let i = 0; i < guessChars.length; i++) {
    if (guessChars[i] === answerChars[i]) {
      result[i] = {
        letter: guessChars[i],
        status: GuessLetterStatus.Correct,
      };
      answerChars[i] = SOLVED_CHAR;
      solvedLetters[i] = true;
    }
  }

  // Step 2: look for misplaced letters. If it's not misplaced,
  // it must be incorrect.
  for (let i = 0; i < guessChars.length; i++) {
    if (solvedLetters[i]) {
      continue;
    }

    let status = GuessLetterStatus.Incorrect;
    const misplacedIndex = answerChars.findIndex(
      (char) => char === guessChars[i]
    );
    if (misplacedIndex >= 0) {
      status = GuessLetterStatus.Misplaced;
      answerChars[misplacedIndex] = SOLVED_CHAR;
    }

    result[i] = {
      letter: guessChars[i],
      status,
    };
  }

  return result;
}

// Virtual keyboard helpers
const STATUS_PRIORITY = {
  [GuessLetterStatus.Correct]: 3,
  [GuessLetterStatus.Misplaced]: 2,
  [GuessLetterStatus.Incorrect]: 1,
}

/**
 * Flattens all guessed letters into a map of letter => status. Prioritizes status based on letter
 * submission accuracy (i.e., correct over all, misplaced over incorrect).
 * @param guesses {GuessEval[]} Current submitted guesses
 * @returns Object mapping letters to their desired keyboard status
 */
export function getVKKeyStatuses(guesses: GuessEval[]): VKKeysStatuses {
  const keysMap = new Map<string, GuessLetterStatus>();

  guesses.forEach(guess => {
    guess.forEach(({letter, status}) => {
      const mapLetterStatus = keysMap.get(letter);

      if(!mapLetterStatus || STATUS_PRIORITY[status] > STATUS_PRIORITY[mapLetterStatus]) {
        keysMap.set(letter, status);
      }
    });
  });

  return Object.fromEntries(keysMap);
}
