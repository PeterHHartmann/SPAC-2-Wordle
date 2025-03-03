import { WordQuadrant } from './WordQuadrant';

type Props = {
    answer: string;
    word?: string;
};

export function WordRow({ word }: Props) {
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