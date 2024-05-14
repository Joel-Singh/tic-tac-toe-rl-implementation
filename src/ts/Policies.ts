type possibleBoardStates = "empty" | "o" | "x"
type BoardState = [ possibleBoardStates, possibleBoardStates, possibleBoardStates, possibleBoardStates, possibleBoardStates, possibleBoardStates, possibleBoardStates, possibleBoardStates, possibleBoardStates ]

function Policy(state: BoardState, value: number) {
  return {
    state,
    value
  }
}

type Policy = ReturnType<typeof Policy>

// assume Reino always goes second and is x
export function createPolicies() {
  const policies: Policy[] = [];

  function addPolicy(turnSymbol: possibleBoardStates, currentState: BoardState) {
    if (isFull(currentState)) {
      policies.push(Policy(currentState, 0));
    } else {
      for (let i = 0; i < 9; i++) {
        if (currentState[i] === 'empty') {
          currentState[i] = turnSymbol;
          addPolicy(turnSymbol === 'x' ? 'o' : 'x', createCopy(currentState));
          currentState[i] = 'empty';
        }
      }
    }
  }

  addPolicy('o', createEmptyBoardState());
  return policies

  function isFull(boardState: BoardState) {
    return !boardState.includes('empty');
  }

  function createCopy(boardState: BoardState): BoardState {
    return [
      boardState[0],
      boardState[1],
      boardState[2],
      boardState[3],
      boardState[4],
      boardState[5],
      boardState[6],
      boardState[7],
      boardState[8],
    ]
  }
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
