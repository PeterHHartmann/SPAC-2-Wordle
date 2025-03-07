import { useEffect, useState } from 'react';
import './App.css';
import { GameBoard } from './components/gameboard/GameBoard';
import type { Gameboard, GameProgress, Guess } from './lib/types';
import { genEmptyBoard } from './lib/utility';
import { isValidAlphabetKey, checkGuessIsValid, checkIfGameIsWon, compareGuess, getRandomSolution } from './lib/gameValidation';
import { DialogFeed } from './components/feedback/ErrorDialogFeed';
import { Keyboard } from './components/keyboard/Keyboard';
import { GameFinishedDialog } from './components/feedback/GameFinishedDialog';

function App() {

    const [solution, setSolution] = useState<string>(getRandomSolution());
    const [attemptCount, setAttempCount] = useState<number>(0);
    const [gameboard, setGameboard] = useState<Gameboard>(genEmptyBoard());
    const [gameProgress, setGameProgress] = useState<GameProgress>('ongoing');
    const [dialogMessages, setDialogMessages] = useState<(string | null)[]>([]);

    function handleKeyDown(key: string) {
        if (gameProgress === 'lost' || gameProgress === 'won') {
            return;
        }
        if (isValidAlphabetKey(key)) {
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
            }
        }
        else if (key === 'BACKSPACE') {
            const gameboard_copy = gameboard.slice();
            const letterExistsIndex: number = gameboard_copy[attemptCount].findLastIndex((guessInput) => guessInput.letter != null);
            if (letterExistsIndex !== -1) {
                gameboard_copy[attemptCount][letterExistsIndex].letter = null;
                setGameboard(gameboard_copy);
            }
        } else if (key === 'ENTER') {
            const gameboard_copy = gameboard.slice();
            const guess = gameboard_copy[attemptCount];
            const isUnfilled: boolean = gameboard_copy[attemptCount].some((guessInput) => guessInput.letter == null);
            if (isUnfilled === false) {
                const guessIsValid = checkGuessIsValid(guess);
                if (guessIsValid) {
                    const outcome = compareGuess(guess, solution);
                    gameboard_copy[attemptCount] = outcome;
                    localStorage.setItem('gameboard', JSON.stringify(gameboard_copy));
                    setGameboard(gameboard_copy);
                    handleGuessSubmitted(outcome);
                } else {
                    setDialogMessages(() => {
                        const newMessages = dialogMessages.slice();
                        newMessages.push('Not in word list');
                        return newMessages;
                    });
                }
            }
        }
    };

    function handleGuessSubmitted(outcome: Guess) {
        if (gameProgress === 'lost' || gameProgress === 'won') {
            return;
        }
        const gameHasBeenWon = checkIfGameIsWon(outcome);
        if (gameHasBeenWon) {
            setGameProgress('won');
            localStorage.setItem('gameProgress', 'won');
        }
        else if (attemptCount < 5) {
            localStorage.setItem('attemptCount', String(attemptCount + 1));
            setAttempCount(attemptCount + 1);
        } else {
            setGameProgress('lost');
            localStorage.setItem('gameProgress', 'lost');
        }
    }

    useEffect(() => {
        const JSONGameboard = localStorage.getItem('gameboard');
        const attemptCountStr = localStorage.getItem('attemptCount');
        if (JSONGameboard && attemptCountStr) {
            const parsedGameboard: Gameboard = JSON.parse(JSONGameboard);
            setGameboard(parsedGameboard);
            setAttempCount(parseInt(attemptCountStr, 10));
        }
        const storedSolution = localStorage.getItem('solution');
        if (storedSolution) {
            setSolution(storedSolution);
        }
        const storedGameProgress = localStorage.getItem('gameProgress');
        if (storedGameProgress) {
            setGameProgress(storedGameProgress as GameProgress);
        }
    }, []);

    useEffect(() => {
        const storedSolution = localStorage.getItem('solution');
        if (!storedSolution) {
            localStorage.setItem('solution', solution);
            console.log(solution);
        }
    }, [solution]);

    return (
        <>
            <main className='w-full min-h-screen p-12 border-0' tabIndex={0} onKeyDown={(event) => handleKeyDown(event.key.toUpperCase())}>
                <GameFinishedDialog gameProgress={gameProgress}></GameFinishedDialog>
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
