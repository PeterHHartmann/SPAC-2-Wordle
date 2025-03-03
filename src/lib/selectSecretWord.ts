import { WORDLIST } from './wordList';

export function selectSecretWord() {
    const length = WORDLIST.length;
    const randomIndex = Math.floor(Math.random() * (length - 1));
    return WORDLIST[randomIndex];

}
