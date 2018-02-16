'use strict';

const generateWinningNumber = () => {
  return Math.floor(Math.random() * 100 + 1);
};

const shuffle = (array) => {
  var m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
};

class Game {
  constructor() {
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
  }

  difference() {
    return Math.abs(this.winningNumber - this.playersGuess);
  }

  isLower() {
    return this.playersGuess < this.winningNumber;
  }

  playersGuessSubmission(num) {
    if (num < 1 || num > 100 || typeof num !== 'number') {
      throw 'That is an invalid guess.';
    }
    this.playersGuess = num;
    return this.checkGuess();
  }

  checkGuess() {
    let variance = this.difference();
    if (this.playersGuess === this.winningNumber) {
      return 'You Win!';
    }

    if (this.pastGuesses.indexOf(this.playersGuess) > -1) {
      return 'You have already guessed that number.';
    }

    this.pastGuesses.push(this.playersGuess);

    if (this.pastGuesses.length === 5) {
      return 'You Lose.';
    }

    if (variance < 10) {
      return 'You\'re burning up!';
    }

    if (variance < 25) {
      return 'You\'re lukewarm.';
    }

    if (variance < 50) {
      return 'You\'re a bit chilly.';
    }

    if (variance < 100) {
      return 'You\'re ice cold!';
    }
  }

  provideHint() {
    let hintArr = [this.winningNumber];
    for (let i = 0; i < 2; i++) {
      hintArr.push(generateWinningNumber());
    }
    return shuffle(hintArr);
  }
}

function newGame() {
  return new Game();
}
