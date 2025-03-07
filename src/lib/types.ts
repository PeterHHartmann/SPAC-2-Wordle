export type GameLetter = 'A' | 'B';

export type GuessInputStatus = 'absent' | 'present' | 'correct';

export type GuessInput = {
    letter: string | null,
    status: GuessInputStatus | null,
};

export type Guess = GuessInput[];

export type Gameboard = Guess[];

export type GameProgress = 'ongoing' | 'lost' | 'won';