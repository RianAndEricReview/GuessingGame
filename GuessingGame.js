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
      $("#subtitle").text('Press the reset button to play again!');
      $("#submit, #hint").prop("disabled", true);
      return 'You Win!';
    }

    if (this.pastGuesses.indexOf(this.playersGuess) > -1) {
      return 'You have already guessed that number.';
    }

    this.pastGuesses.push(this.playersGuess);
    $('#guess-list li:nth-child('+ this.pastGuesses.length +')').text(this.playersGuess);

    if (this.pastGuesses.length === 5) {
      $("#subtitle").text('Press the reset button to play again!');
      $("#submit, #hint").prop("disabled", true);
      return 'You Lose.';
    }

    if (!this.isLower()) {
      $("#subtitle").text('Guess Lower');
    } else {
      $("#subtitle").text('Guess Higher');
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

function getPlayersGuess(gameInstance) {
  let playersGuess = $("#players-input").val();
  $("#players-input").val("");
  let output = gameInstance.playersGuessSubmission(+playersGuess);
  $("#title").text(output)
}

$(document).ready(function(){
  let game = new Game();
  $("#submit").click(function(){
    getPlayersGuess(game);
  })

  $("#players-input").on('keypress', function(event) {
    if (event.which === 13) {
      getPlayersGuess(game)
    }
  })

  $("#reset").click(function(event) {
    let game = new Game;
    $("#title").text('Play the Guessing Game!');
    $("#subtitle").text('Guess a number between 1-100');
    $(".guess").text('-');
    $("#hint, #submit").prop("disabled", false);
  })

  $("#hint").click(function(event) {
    let hintList = game.provideHint();
    $("#title").text(`The winning number is ${hintList[0]}, ${hintList[1]}, or ${hintList[2]}`);
  })
})
