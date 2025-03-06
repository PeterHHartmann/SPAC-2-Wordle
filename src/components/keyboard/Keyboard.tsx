import { KEYBOARD_LAYOUT } from '../../lib/constants';
import backspaceIcon from '../../assets/backspace.svg';
import clsx from 'clsx';
import type { Gameboard } from '../../lib/types';
import { useMemo } from 'react';

type Props = {
    handleKeyPressed: (event: string) => void;
    gameboard: Gameboard;
};

export function Keyboard({ handleKeyPressed, gameboard }: Props) {

    const keyboardState = useMemo(() => {
        const template: { letter: string, status: string | null; }[] = KEYBOARD_LAYOUT.flat().map((key) => ({ letter: key, status: null }));
        gameboard.flat().forEach((input) => {
            if (input.letter !== null && input.status !== null) {
                const keyboardKeyIndex = template.findIndex((key) => key.letter === input.letter);
                if (keyboardKeyIndex !== -1 && input.status === 'absent') {
                    template[keyboardKeyIndex].status = 'absent';
                } else if (keyboardKeyIndex !== -1 && input.status === 'present' && template[keyboardKeyIndex].status !== 'correct') {
                    template[keyboardKeyIndex].status = 'present';
                } else if (keyboardKeyIndex !== -1 && input.status === 'correct') {
                    template[keyboardKeyIndex].status = 'correct';
                }
            }
        });
        const result: { letter: string, status: string | null; }[][] = [];
        for (let i = 0;i < KEYBOARD_LAYOUT.length;i++) {
            const acc: { letter: string, status: string | null; }[] = [];
            for (let j = 0;j < KEYBOARD_LAYOUT[i].length;j++) {
                const removed = template.shift();
                if (removed) {
                    acc.push(removed);
                }
            }
            result.push(acc);
        }
        return result;
    }, [gameboard]);

    return (
        <div className='py-8 grid gap-1.5 justify-center'>
            {keyboardState.map((row, rowIndex) =>
                <div
                    key={`keyboardRow-${rowIndex}`}
                    className='flex gap-1.5 justify-center'
                >
                    {row.map((key, keyIndex) =>
                        <button
                            key={`keyboardKey-id${keyIndex}`}
                            onClick={() => handleKeyPressed(key.letter)}
                            className={clsx(
                                'text-2xl font-bold font-stretch-extra-condensed py-3 px-4 rounded-sm',
                                key.letter === 'ENTER' && 'text-[1rem]',
                                key.status === null && 'bg-empty',
                                key.status === 'correct' && 'text-white bg-correct border-correct',
                                key.status === 'present' && 'text-white bg-present border-present',
                                key.status === 'absent' && 'text-white bg-absent border-absent',
                            )}
                        >
                            {key.letter === 'BACKSPACE'
                                ? <img src={backspaceIcon}></img>
                                : <p>{key.letter}</p>
                            }
                        </button>
                    )}
                </div>
            )}
        </div>
        // <div className='py-8 grid gap-1.5 justify-center'>
        //     {keyboardState.map((key, keyIndex) =>
        //         <button
        //             key={`keyboardKey-id${keyIndex}`}
        //             onClick={() => handleKeyPressed(key.letter)}
        //             className={clsx(
        //                 'text-2xl font-bold font-stretch-extra-condensed py-3 px-4 rounded-sm',
        //                 key.letter === 'ENTER' && 'text-[1rem]',
        //                 key.status === null && 'bg-empty',
        //                 key.status === 'correct' && 'text-white bg-correct border-correct',
        //                 key.status === 'present' && 'text-white bg-present border-present',
        //                 key.status === 'absent' && 'text-white bg-absent border-absent',
        //             )}
        //         >
        //             {key.letter === 'BACKSPACE'
        //                 ? <img src={backspaceIcon}></img>
        //                 : <p>{key.letter}</p>
        //             }
        //         </button>
        //     )}

        // </div>
    );
};