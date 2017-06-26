angular.module('hangman')
/**
 * service to communicate to hangman server
 */
.service('hangmanService', ['$http', 'BASE_URL', function($http, BASE_URL) {

  return {

    /**
     * function to create a new game
     * @param player's email
     */
    newGame: function(email) {
      var data = {email: email};
      return $http.post(BASE_URL, data).then(function(successResponse) {
          console.log("Success creating new game: ", JSON.stringify(successResponse));
          return successResponse.data;
      }, function(errorResponse) {
          console.error("Error creating new game: ", JSON.stringify(errorResponse));
          return errorResponse.data;
      });
    },

    /**
     * function to play a character
     * @param gameId
     * @param character
     */
    playCharacter: function(gameId, character) {
      var data = {char: character};
      return $http.post(BASE_URL + gameId + "/guesses", data).then(function(successResponse) {
           console.log("Success playCharacter: " + JSON.stringify(successResponse));
           return successResponse.data;
      }, function(errorResponse) {
           console.log("Error playCharacter: " + JSON.stringify(errorResponse));
           return errorResponse.data;
      });
    },

    /**
     * function to get a game's status
     * @param gameId
     */
    getGameStatus: function(gameId) {
      return $http.get(BASE_URL + gameId).then(function(successResponse) {
          console.log("Success getGameStatus: " + JSON.stringify(successResponse));
          return successResponse.data;
      }, function(errorResponse) {
          console.log("Error getGameStatus: " + JSON.stringify(errorResponse));
          return errorResponse.data;
      });
    }
  }
}]);
