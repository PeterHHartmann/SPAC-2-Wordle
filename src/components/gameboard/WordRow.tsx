import { WordQuadrant } from './WordQuadrant';

type Props = {
    answer: string;
    word?: string;
};

export function WordRow({ word }: Props) {
    console.log(word);

    return (
        <>
            <div className='grid grid-cols-5 gap-1'>
                <WordQuadrant letter='A'></WordQuadrant>
                <WordQuadrant></WordQuadrant>
                <WordQuadrant></WordQuadrant>
                <WordQuadrant></WordQuadrant>
                <WordQuadrant></WordQuadrant>
            </div>
        </>
    );
}