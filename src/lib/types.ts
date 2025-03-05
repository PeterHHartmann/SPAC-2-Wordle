export type GameLetter = 'A' | 'B';

export type GuessInputStatus = 'absent' | 'present' | 'correct';

export type GuessInput = {
    letter: string | undefined,
    status: GuessInputStatus | undefined,
};

export type Guess = GuessInput[];

export type Gameboard = Guess[];
