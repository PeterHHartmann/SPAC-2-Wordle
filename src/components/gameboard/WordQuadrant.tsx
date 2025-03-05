import clsx from 'clsx';
import type { GuessInput } from '../../lib/types';

type Props = {
    guess: GuessInput;
};

export function WordQuadrant({ guess }: Props) {
    return (
        <div className={clsx(
            'flex justify-center items-center aspect-square border-[2px] border-gray-300 max-w-16 max-h-16 p-3 font-bold text-4xl',
            (guess.letter !== undefined && guess.status == undefined) && 'text-black border-gray-700',
            guess.status === 'correct' && 'text-white bg-green-500 border-green-500',
            guess.status === 'present' && 'text-white bg-yellow-500  border-yellow-500',
            guess.status === 'absent' && 'text-white bg-gray-500  border-gray-500',

        )}>
            <p className='p-0 m-0'>
                {guess.letter}</p>
        </div >
    );
}