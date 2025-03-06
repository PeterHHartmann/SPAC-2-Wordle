import { WORDLIST } from './wordList';
import type { Guess, GuessInputStatus } from './types';
import { guessToString } from './utility';

export function selectSecretWord(): string {
    const length = WORDLIST.length;
    const randomIndex = Math.floor(Math.random() * (length - 1));
    return WORDLIST[randomIndex];
}

export function isValidAlphabetKey(key: string): boolean {
    // Uses a regex which check for letter a to z lowercase
    const regex: RegExp = /^[a-zA-Z]$/;
    const isValid = regex.test(key);
    return isValid;
}

export function checkGuessIsValid(guess: Guess): boolean {
    const guessWord = guessToString(guess);
    return WORDLIST.includes(guessWord);
}

export function compareGuess(guess: Guess, target: string): Guess {
    const targetLetters = target.split('') as [string | null];
    const result = guess.map((input) => ({ letter: input.letter, status: 'absent' })) as { letter: string, status: GuessInputStatus; }[];
    for (let i = 0;i < 5;i++) {
        if (guess[i].letter === targetLetters[i]) {
            result[i].status = 'correct';
            targetLetters[i] = null;
        }
    }

    for (let i = 0;i < 5;i++) {
        if (result[i].status === "correct") continue; // Skip correct matches

        const index = targetLetters.indexOf(result[i].letter);
        if (index !== -1) {
            result[i].status = "present";
            targetLetters[index] = null; // Mark as used
        }
    }

    return result;
}

export function checkIfGameIsWon(guess: Guess): boolean {
    const hasWrongLetters = guess.some((guessInput) => guessInput.status === 'absent' || guessInput.status === 'present');
    return !hasWrongLetters;
}