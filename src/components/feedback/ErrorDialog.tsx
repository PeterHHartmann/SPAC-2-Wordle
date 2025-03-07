import { useState } from 'react';

type Props = {
    message: string | null;
};

export function Dialog({ message }: Props) {

    const [isClosed, setIsClosed] = useState<boolean>(false);

    if (isClosed) {
        return null;
    }

    return (
        <dialog
            open={message !== null}
            onClose={() => setIsClosed(true)}
            className='px-4 py-2 rounded-sm transition-dialog animate-dialogfade w-max sticky'
        >
            {message}
        </dialog>
    );
}