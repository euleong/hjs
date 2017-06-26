angular.module('hangman')
/**
 * controller for hangman app
 */
.controller('hangmanController', ['$scope', 'hangmanService', 'hangmanGuessService', 'GAME_STATUS', 'GAME_MSGS',
function($scope, hangmanService, hangmanGuessService, GAME_STATUS, GAME_MSGS) {

  // id of the game
  $scope.gameId = null;
  // word to guess, updates after every guess
  $scope.word = null;
  // number of guesses left for the game
  $scope.guessesLeft = 0;
  // status of the game (inactive or active)
  $scope.gameStatus = null;
  // result of the gameso far, updated after every guess
  $scope.result = null;

  /**
   * function to create a new game and solve it
   * user should call this with an email to create a new game and automatically solve it
   * @param user's email
   */
  $scope.createGameAndSolve = function(email) {

    // create new game
    hangmanService.newGame(email).then(function(data) {
      console.log("New game data: " + JSON.stringify(data));

      if (data == null) {
        $scope.result = GAME_MSGS.ERROR_CREATING_GAME;
        return;
      }

      if (data.error) {
        $scope.result = GAME_MSGS.ERROR_CREATING_GAME + ', ' + data.error;
        return;
      }

      $scope.gameId = data.gameId;
      $scope.word = data.word;
      $scope.guessesLeft = data.guessesLeft;
      $scope.gameStatus = GAME_STATUS.ACTIVE;
      $scope.guessedChars = [];

      // start making letter guesses
      console.log("Start making guesses for gameId: " + $scope.gameId)
      makeGuesses();
    });

  };

  function makeGuesses() {

    if ($scope.guessesLeft <= 0) {
      $scope.result = GAME_MSGS.NO_MORE_GUESSES;
      return;
    }

    if ($scope.gameStatus === GAME_STATUS.INACTIVE) {
      $scope.result = GAME_MSGS.GAME_INACTIVE;
      return;
    }

    var char = hangmanGuessService.getNextChar($scope.guessedChars, $scope.word);

    if (char == null) {
      $scope.result = GAME_MSGS.CANNOT_GET_NEXT_CHAR;
      return;
    }

    hangmanService.playCharacter($scope.gameId, char).then(function(data) {
      console.log("playCharacter result data: " + JSON.stringify(data));

      $scope.guessesLeft = data.guessesLeft;
      $scope.word = data.word;
      $scope.gameStatus = data.status;
      $scope.guessedChars.push(char);
      $scope.result = data.msg;

      if ($scope.gameStatus === GAME_STATUS.INACTIVE) {
        console.log("Game is over: " + $scope.result);
        return;
      }

      makeGuesses();
    });
  }

}]);
