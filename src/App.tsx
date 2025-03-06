import { useState, type KeyboardEvent } from 'react';
import './App.css';
import { GameBoard } from './components/gameboard/GameBoard';
import type { Gameboard, Guess } from './lib/types';
import { isValidAlphabetKey } from './lib/keyboardInputs';
import { genEmptyBoard, guessToString } from './lib/utility';
import { checkGuessIsValid, checkIfGameIsWon, compareGuess, selectSecretWord } from './lib/gameValidation';
import { DialogFeed } from './components/feedback/DialogFeed';

function App() {

    const [secretWord] = useState<string>(selectSecretWord());
    console.log(secretWord);

    const [attemptCount, setAttempCount] = useState<number>(0);
    const [gameboard, setGameboard] = useState<Gameboard>(genEmptyBoard());
    const [gameIsWon, setGameIsWon] = useState<boolean>(false);
    const [gameIsLost, setGameIsLost] = useState<boolean>(false);
    const [dialogMessages, setDialogMessages] = useState<(string | null)[]>([]);

    function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
        if (gameIsWon || gameIsLost) {
            return;
        }
        if (isValidAlphabetKey(event.key)) {
            console.log('you pressed a valid letter');
            const currentGuessLetter = gameboard[attemptCount].findIndex((guess) => guess.letter == undefined);
            if (currentGuessLetter !== -1) {
                setGameboard(() => {
                    const gameboard_copy = gameboard.slice();
                    gameboard_copy[attemptCount][currentGuessLetter] = {
                        letter: event.key.toUpperCase(),
                        status: undefined
                    };
                    return gameboard_copy;
                });
                console.log('set new letter on gameboard', event.key.toUpperCase());
            }
        }
        else if (event.key === 'Backspace') {
            console.log('Backspace pressed');
            const gameboard_copy = gameboard.slice();
            const letterExistsIndex: number = gameboard_copy[attemptCount].findLastIndex((guessInput) => guessInput.letter != undefined);
            if (letterExistsIndex !== -1) {
                console.log(`Deleting letter ${gameboard_copy[attemptCount][letterExistsIndex].letter} on position ${letterExistsIndex}`);
                gameboard_copy[attemptCount][letterExistsIndex].letter = undefined;
                setGameboard(gameboard_copy);
            }
        } else if (event.key === 'Enter') {
            console.log('Enter pressed');
            const gameboard_copy = gameboard.slice();
            const guess = gameboard_copy[attemptCount];
            const isUnfilled: boolean = gameboard_copy[attemptCount].some((guessInput) => guessInput.letter == undefined);
            if (isUnfilled === false) {
                const guessIsValid = checkGuessIsValid(guess);
                if (guessIsValid) {
                    const outcome = compareGuess(guess, secretWord);
                    gameboard_copy[attemptCount] = outcome;
                    setGameboard(gameboard_copy);
                    handleGuessSubmitted(outcome);
                } else {
                    setDialogMessages(() => {
                        const newMessages = dialogMessages.slice();
                        newMessages.push('Not in word list');
                        return newMessages;
                    });
                    console.log(`Guess: ${guessToString(guess)} is invalid`);
                }
            }
        }
    };

    function handleGuessSubmitted(outcome: Guess) {
        if (gameIsWon || gameIsLost) {
            return;
        }
        const gameHasBeenWon = checkIfGameIsWon(outcome);
        if (gameHasBeenWon) {
            console.log('You have won!');
            setGameIsWon(true);
        }
        else if (attemptCount < 5) {
            setAttempCount(attemptCount + 1);
        } else {
            console.log('Game over');
            setGameIsLost(true);
        }
    }

    return (
        <>
            <main className='w-full min-h-screen p-12 border-0' tabIndex={0} onKeyDown={handleKeyDown}>
                <DialogFeed
                    messages={dialogMessages}
                    setMessages={setDialogMessages}
                ></DialogFeed>
                <GameBoard
                    gameboard={gameboard}
                ></GameBoard>
            </main>
        </>
    );
}

export default App;
