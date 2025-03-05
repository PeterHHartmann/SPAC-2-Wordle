async function loadWordList() {
    try {
        console.log('Loading wordle_ord.txt');
        const foo = Bun.file('wordle_ord.txt');
        const text = await foo.text();
        const arr = text.split('\n');
        arr.shift();
        arr.pop();
        const uppercased = arr.map((word) => word.toUpperCase());
        const result = `export const WORDLIST = [${"'" + uppercased.join("','") + "'"}]`;
        const writePath = 'src/lib/wordList.ts';
        console.log(`Writing word list to "${writePath}"`);

        await Bun.write(writePath, result);
        return uppercased;
    } catch (error) {
        console.log(error);
    }
}

loadWordList().then(() => {
    console.log('Done');
});