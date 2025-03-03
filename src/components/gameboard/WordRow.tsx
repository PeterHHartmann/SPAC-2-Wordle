import { WordQuadrant } from './WordQuadrant';

export function WordRow() {
    return (
        <>
            <div className='grid grid-cols-5 gap-1'>
                <WordQuadrant></WordQuadrant>
                <WordQuadrant></WordQuadrant>
                <WordQuadrant></WordQuadrant>
                <WordQuadrant></WordQuadrant>
                <WordQuadrant></WordQuadrant>
            </div>
        </>
    );
}