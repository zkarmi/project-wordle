import { GuessEval, PartialGuess } from "../../types";
import Guess from "./Guess";

function GuessTracker({guesses}: {guesses: PartialGuess[]}) {
  return (
    <div className="guess-results">
      {
        /* I'm OK with idx-based keys here bc we would only add rows during a game */
        guesses.map((guess, i) => <Guess key={i} guess={guess} />)
      }
    </div>
  );
}

export default GuessTracker;
