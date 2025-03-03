import { WordRow } from './WordRow';

export function GameBoard() {
    return (
        <div>
            <div className='grid grid-rows-6 max-w-96 m-auto gap-1'>
                <WordRow></WordRow>
                <WordRow></WordRow>
                <WordRow></WordRow>
                <WordRow></WordRow>
                <WordRow></WordRow>
                <WordRow></WordRow>
            </div>
        </div>
    );
}