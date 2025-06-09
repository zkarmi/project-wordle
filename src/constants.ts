import { ValidKeys } from "./types";

export const NUM_OF_GUESSES_ALLOWED = 6;
export const GUESS_LENGTH = 5;
export const GAME_STATES = {
    WIN: 'win',
    LOSS: 'loss'
  } as const;
export const QWERTY = [
  'Q', 'W', 'E', 'R', 'T', 'Y',
  'U', 'I', 'O', 'P', 'A', 'S',
  'D', 'F', 'G', 'H', 'J', 'K',
  'L', 'Z', 'X', 'C', 'V', 'B',
  'N', 'M'
] as const;
export const VALID_KEYS_SET = new Set<ValidKeys>(QWERTY);
