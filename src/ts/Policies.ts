type possibleBoardStates = "empty" | "o" | "x"
type BoardState = [ possibleBoardStates, possibleBoardStates, possibleBoardStates, possibleBoardStates, possibleBoardStates, possibleBoardStates, possibleBoardStates, possibleBoardStates, possibleBoardStates ]

// @ts-ignore
function Policy(state: BoardState, value: number, possibleMoves: ReturnType<typeof Policy>[]) {
  return {
    state,
    value,
    possibleMoves
  }
}

type Policy = ReturnType<typeof Policy>

// assume Reino always goes second and is x
export function createAllPossiblePolicies() {
  const initialPolicy = Policy(createEmptyBoardState(), 0, []);

  function addPolicy(turnSymbol: possibleBoardStates, policy: Policy) {
    const stateCopy = createCopy(policy.state)
    for (let i = 0; i < 9; i++) {
      if (policy.state[i] === 'empty') {
        stateCopy[i] = turnSymbol;
        const newPolicy = Policy(createCopy(stateCopy), 0, []);
        policy.possibleMoves.push(newPolicy);
        addPolicy(turnSymbol === 'x' ? 'o' : 'x', newPolicy);
        stateCopy[i] = 'empty';
      }
    }
  }

  addPolicy('o', initialPolicy);
  return initialPolicy;

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
