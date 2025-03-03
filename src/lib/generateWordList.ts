async function loadWordList() {
    try {
        console.log('Loading wordle_ord.txt');
        const foo = Bun.file('wordle_ord.txt');
        const text = await foo.text();
        const arr = text.split('\n');
        arr.shift();
        arr.pop();
        const result = `export const WORDLIST = [${"'" + arr.join("','") + "'"}]`;
        const writePath = 'src/lib/wordList.ts';
        console.log(`Writing word list to "${writePath}"`);

        await Bun.write(writePath, result);
        return arr;
    } catch (error) {
        console.log(error);
    }
}

loadWordList().then(() => {
    console.log('Done');
});