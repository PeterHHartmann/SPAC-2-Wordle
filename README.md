# SPAC Wordle

This project is an exercise in recreating the popular only word guessing game, Wordle.  
The project is developed using React, TypeScript, Vite and Bun.

## Functionality
 - Selecting a secret word to be the winning answer of the game from a word list.
 - Ensuring that a user guess is valid by validating if it is present in wordlist.
 - UI gameboard with 6 rows containing 5 word quadrants.
 - Capturing input of guesses from users physical keyboard.
 - Tracking of amount of guesses used.
 - Tracking of game progress (ongoing, won or lost).

 - Visual feedback on which letters in guess are  
    -- absent (not present in answer)  
    -- present (present in answer but on the wrong position)  
    -- correct (present in answer and on the correct position)  
    on the UI gameboard.
 - Visual feedback when guessed word is invalid i.e. not present in word list.
 - Visual feedback on game won/lost.
 - UI virtual keyboard for user mouse input as well as displaying letters used in previous guesses and their correctness.
 - Storing and initializing previous game state, for example if the user closed the window or refreshes.

## Get Started
 - To install and run the project ensure you have [Bun](https://bun.sh/docs/installation#macos-and-linux) installed on your machine.
    
 - Installing the project: 
```bash
bun install
```

- Running in development mode:
```bash
bun run dev
```

- Once the application is running you can view it on [localhost:5173](http://localhost:5173/)
