import { GAME_STATES } from "../../constants";
import { GameState } from "../../types";

const gameStatesDetails = {
  [GAME_STATES.WIN]: {
    bannerClass: 'happy',
    msg: (numGuesses: number) => (
      <p>
        <strong>Congratulations!</strong> Got it in{' '}
        <strong>{numGuesses} guesses</strong>.
      </p>
    )
  },
  [GAME_STATES.LOSS]: {
    bannerClass: 'sad',
    msg: (answer: string) => (
      <p>Sorry, the correct answer is <strong>{answer}</strong>.</p>
    )
  }
} as const;

type GameStateBannerProps = {state: GameState, answer: string, numGuesses: number};

function GameStateBanner({state, answer, numGuesses}: GameStateBannerProps) {
  const {bannerClass} = gameStatesDetails[state];

  return (
    <div className={`banner ${bannerClass}`}>
    {state === GAME_STATES.WIN
      ? gameStatesDetails[state].msg(numGuesses)
      : gameStatesDetails[state].msg(answer)}
    </div>
  )
}

export default GameStateBanner;
