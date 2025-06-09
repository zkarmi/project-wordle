import { QWERTY } from "../../constants";
import { getVKKeyStatuses } from "../../game-helpers";
import { GuessLetterStatus, PartialGuess, VKKeysStatuses } from "../../types";

function VirtualKeyboard({guesses}: {guesses: PartialGuess[]}) {

  const letterStatuses: VKKeysStatuses = getVKKeyStatuses(guesses.filter(Array.isArray));

  const keyClass = 'vk-key';

  return (
    <div className="vk-wrapper">
    {
      QWERTY.map((letter, idx) => (
        <>
          <span
            key={letter}
            className={[
              'vk-key',
              letterStatuses[letter] ?? GuessLetterStatus.Incorrect,
            ].join(' ')}
          >
            {letter}
          </span>
          {(idx === 9 || idx === 18) && <span className="vk-break" />}
        </>
      ))
    }
    </div>
  );
}

export default VirtualKeyboard;
