import { useState } from 'react';
import './App.css';
import { GameBoard } from './components/gameboard/GameBoard';
import type { Gameboard, Guess } from './lib/types';
import { genEmptyBoard, guessToString } from './lib/utility';
import { isValidAlphabetKey, checkGuessIsValid, checkIfGameIsWon, compareGuess, selectSecretWord } from './lib/gameValidation';
import { DialogFeed } from './components/feedback/DialogFeed';
import { Keyboard } from './components/keyboard/Keyboard';

function App() {

    const [secretWord] = useState<string>(selectSecretWord());
    console.log(secretWord);

    const [attemptCount, setAttempCount] = useState<number>(0);
    const [gameboard, setGameboard] = useState<Gameboard>(genEmptyBoard());
    const [gameIsWon, setGameIsWon] = useState<boolean>(false);
    const [gameIsLost, setGameIsLost] = useState<boolean>(false);
    const [dialogMessages, setDialogMessages] = useState<(string | null)[]>([]);

    function handleKeyDown(key: string) {
        if (gameIsWon || gameIsLost) {
            return;
        }
        if (isValidAlphabetKey(key)) {
            console.log('you pressed a valid letter');
            const currentGuessLetter = gameboard[attemptCount].findIndex((guess) => guess.letter == null);
            if (currentGuessLetter !== -1) {
                setGameboard(() => {
                    const gameboard_copy = gameboard.slice();
                    gameboard_copy[attemptCount][currentGuessLetter] = {
                        letter: key,
                        status: null
                    };
                    return gameboard_copy;
                });
                console.log('set new letter on gameboard', key);
            }
        }
        else if (key === 'BACKSPACE') {
            console.log('Backspace pressed');
            const gameboard_copy = gameboard.slice();
            const letterExistsIndex: number = gameboard_copy[attemptCount].findLastIndex((guessInput) => guessInput.letter != null);
            if (letterExistsIndex !== -1) {
                console.log(`Deleting letter ${gameboard_copy[attemptCount][letterExistsIndex].letter} on position ${letterExistsIndex}`);
                gameboard_copy[attemptCount][letterExistsIndex].letter = null;
                setGameboard(gameboard_copy);
            }
        } else if (key === 'ENTER') {
            console.log('Enter pressed');
            const gameboard_copy = gameboard.slice();
            const guess = gameboard_copy[attemptCount];
            const isUnfilled: boolean = gameboard_copy[attemptCount].some((guessInput) => guessInput.letter == null);
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
            <main className='w-full min-h-screen p-12 border-0' tabIndex={0} onKeyDown={(event) => handleKeyDown(event.key.toUpperCase())}>
                <DialogFeed
                    messages={dialogMessages}
                    setMessages={setDialogMessages}
                ></DialogFeed>
                <GameBoard
                    gameboard={gameboard}
                ></GameBoard>
                <Keyboard handleKeyPressed={handleKeyDown} gameboard={gameboard}></Keyboard>
            </main>
        </>
    );
}

export default App;
