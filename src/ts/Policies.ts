type possibleBoardStates = "empty" | "o" | "x"
type BoardState = [ possibleBoardStates, possibleBoardStates, possibleBoardStates, possibleBoardStates, possibleBoardStates, possibleBoardStates, possibleBoardStates, possibleBoardStates, possibleBoardStates ]

function Policy(state: BoardState, value: number) {
  return {
    state,
    value
  }
}

type Policy = ReturnType<typeof Policy>

export function createPolicies() {
  const policies: Policy[] = [];
  for (let i = 1; i <= 8; i++) {
    const boardState = createEmptyBoardState();
    boardState[0] = 'o';

    boardState[i] = 'x';

    const policy = Policy(boardState, 0);
    policies.push(policy);
  }
  return policies;
}

function createEmptyBoardState(): BoardState {
  return [
    'empty',
    'empty',
    'empty',
    'empty',
    'empty',
    'empty',
    'empty',
    'empty',
    'empty',
  ]
}
