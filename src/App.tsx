import { useState, type KeyboardEvent } from 'react';
import './App.css';
import { GameBoard } from './components/gameboard/GameBoard';
import { selectSecretWord } from './lib/selectSecretWord';
import { ALLOWED_LETTERS } from './lib/allowedLetters';
import type { GuessRow } from './lib/types';

const secretWord = selectSecretWord();

function App() {

    const [guessColumn, setGuessColumn] = useState<number>(0);
    const [guess, setGuess] = useState<GuessRow>([undefined, undefined, undefined, undefined, undefined]);

    const keyDownHandler = (event: KeyboardEvent<HTMLDivElement>) => {
        if (ALLOWED_LETTERS.includes(event.key.toLowerCase())) {
            const currentColumn = guess.findIndex((value) => value !== undefined);
            const newGuess = guess;
            newGuess[currentColumn] = event.key.toUpperCase();
            console.log(event.key.toLowerCase());

            console.log('you pressed a valid letter');
        }
        else if (event.key === 'Backspace') {
            console.log('Backspace pressed');
        }
    };

    return (
        <>
            <p>{guess}</p>
            <div className='' tabIndex={0} onKeyDown={keyDownHandler}>
                <GameBoard answer={secretWord}></GameBoard>
            </div>
        </>
    );
}

export default App;
