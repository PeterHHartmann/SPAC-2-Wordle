
import { useEffect, useState } from 'react';
import type { GameProgress } from '../../lib/types';

type Props = {
    gameProgress: GameProgress;
};

export function GameFinishedDialog({ gameProgress }: Props) {

    const [closePressed, setClosePressed] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        if (closePressed) {
            setIsOpen(false);
            return;
        }
        if (isOpen === false && !closePressed && gameProgress === 'won' || gameProgress === 'lost') {
            setIsOpen(true);
            return;
        }
    }, [gameProgress, isOpen, closePressed]);

    return (
        <div className='flex justify-center relative'>
            <div className={'fixed px-2 opacity-75'}>
                <dialog
                    open={isOpen}
                    className='px-6 py-4 rounded-sm w-max sticky'
                >
                    <div className='grid'>

                        <button className='ml-auto text-2xl' onClick={() => setClosePressed(true)}>
                            X
                        </button>
                        {gameProgress === 'won'

                            ? <p className='text-6xl py-12 px-8'>
                                You Won!
                            </p>
                            : <p className='text-6xl py-12 px-8'>
                                You Lost!
                            </p>
                        }
                    </div>
                </dialog>
            </div>
        </div>
    );
}