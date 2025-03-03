import { WordRow } from './WordRow';

type Props = {
    answer: string;
};

export function GameBoard({ answer }: Props) {
    return (
        <div>
            <div className='grid grid-rows-6 max-w-96 m-auto gap-1'>
                <WordRow answer={answer}></WordRow>
                <WordRow answer={answer}></WordRow>
                <WordRow answer={answer}></WordRow>
                <WordRow answer={answer}></WordRow>
                <WordRow answer={answer}></WordRow>
                <WordRow answer={answer}></WordRow>
            </div>
        </div>
    );
}