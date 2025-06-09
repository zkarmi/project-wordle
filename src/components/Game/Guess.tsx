import { PartialGuess } from "../../types";

type GuessProps = { guess: PartialGuess };

function Guess({guess}: GuessProps) {
  return (
    <p className="guess">
    {
      typeof guess === 'string' ?
        guess.split('').map((g, i) => <span key={i} className="cell">{g}</span>)
        : guess.map(({letter, status}, i) => (
          <span key={i} className={`cell ${status}`}>{letter}</span>
        ))
    }
    </p>
  )
}

export default Guess;
