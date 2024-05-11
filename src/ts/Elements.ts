function querySelectorWithError(query: string) {
  const queryResult = document.querySelectorAll(query);

  if (queryResult.length > 1) {
    throw new Error("Multiple elements detected")
  }

  if (queryResult.length < 1) {
    throw new Error("No elements detected, is the js file deferred?")
  }

  return queryResult[0]
}

export const  gameElements = querySelectorWithError('#game-elements') as HTMLElement
export const  winnerText = querySelectorWithError('#winner-text') as HTMLElement
export const  gameStartBtn = querySelectorWithError('#start-game') as HTMLElement
export const  currentPlayerTurn = querySelectorWithError("#current-player-turn") as HTMLInputElement
