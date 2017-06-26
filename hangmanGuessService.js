angular.module('hangman')
/**
 * service to guess character for hangman game
 */
.service('hangmanGuessService', ['LETTERS', function(LETTERS) {

  return {
    /**
     * function to get the next char to guess for hangman game
     * currently a primitive algorithm to loop through letters in order of frequency
     * @param guessedLetters
     * @param word to guess
     */
    getNextChar: function(guessedLetters, word) {

      for (var i = 0; i < LETTERS.length; i++) {
        var letter = LETTERS.charAt(i);
        // check if used yet
        if (guessedLetters.indexOf(letter) < 0) {
          return letter;
        }
      }
      return null;
    }
  }


}]);
