'use strict';

angular.module('hangman', [])
.constant("BASE_URL", "http://int-sys.usr.space/hangman/games/")

// from https://en.wikipedia.org/wiki/Letter_frequency
.constant("LETTERS", "etaoinshrdlcumwfgypbvkjxqz")

.constant("GAME_STATUS", {
  "INACTIVE": "inactive",
  "ACTIVE": "active"
})

.constant("GAME_MSGS", {
  "ERROR_CREATING_GAME": "Error creating game",
  "NO_MORE_GUESSES": "No more guesses",
  "GAME_INACTIVE": "Game is inactive, cannot make guess",
  "CANNOT_GET_NEXT_CHAR": "Cannot get next char to guess"
});
