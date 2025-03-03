
type Props = {
    letter?: string;
};

export function WordQuadrant({ letter }: Props) {
    return (
        <div className='aspect-square border-2'>
            <p className='text-black'>{letter}</p>
        </div>
    );
}