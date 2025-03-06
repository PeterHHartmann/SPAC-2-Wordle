import { useEffect, useMemo, type Dispatch, type JSX, type SetStateAction } from 'react';
import { Dialog } from './Dialog';

type Props = {
    messages: (string | null)[];
    setMessages: Dispatch<SetStateAction<(string | null)[]>>;
};

export function DialogFeed({ messages, setMessages }: Props): JSX.Element {

    useEffect(() => {
        if (messages.length > 0) {
            const timeoutId = setTimeout(() => {
                const copy = messages.slice();
                copy.shift();
                console.log(copy);

                setMessages(copy);
            }, 1500);
            return () => clearTimeout(timeoutId);
        }
    }, [messages, setMessages]);

    const dialogList = useMemo(() => {
        const list = messages.map((message, index) => <Dialog key={`dialog-${index}`} message={message}></Dialog>);
        return list.toReversed();
    }, [messages]);

    return (
        <div className='flex justify-center relative'>
            <div className='grid gap-2 fixed px-2'>
                {dialogList}
            </div>
        </div>
    );
}