import { GUESS_LIMIT, WORD_LENGTH_LIMIT } from './constants';
import type { Guess, GuessInput } from './types';

export function genEmptyBoard(): GuessInput[][] {
    const emptyBoard: GuessInput[][] = Array.from(
        { length: GUESS_LIMIT },
        () => Array.from(
            { length: WORD_LENGTH_LIMIT },
            () => ({ letter: undefined, status: undefined })
        )
    );
    return emptyBoard;
};

export function guessToString(guess: Guess): string {
    return guess.reduce<string>((accumulator, guessInput) => accumulator + guessInput.letter, '');
}