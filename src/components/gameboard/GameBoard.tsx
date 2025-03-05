import type { GuessInput } from '../../lib/types';
import { WordRow } from './WordRow';

type Props = {
    gameboard: GuessInput[][];
};

export function GameBoard({ gameboard }: Props) {
    return (
        <>
            <div className='grid grid-rows-6 max-w-[344px] m-auto gap-1.5'>
                {gameboard.map((row, index) => (
                    <WordRow rowData={row} key={`wordRow-${index}`}></WordRow>
                ))
                }
            </div>
        </>
    );
}