import clsx from 'clsx';
import type { GuessInput } from '../../lib/types';

type Props = {
    guess: GuessInput;
};

export function WordQuadrant({ guess }: Props) {
    return (
        <div className={clsx(
            'flex justify-center items-center aspect-square border-[2px] max-w-16 max-h-16 p-3 font-bold text-4xl',
            (guess.letter == undefined && guess.status == undefined) && 'border-empty',
            (guess.letter !== undefined && guess.status == undefined) && 'text-black border-gray-700',
            guess.status === 'correct' && 'text-white bg-correct border-correct',
            guess.status === 'present' && 'text-white bg-present border-present',
            guess.status === 'absent' && 'text-white bg-absent border-absent',
        )}>
            <p className='p-0 m-0'>
                {guess.letter}</p>
        </div >
    );
}