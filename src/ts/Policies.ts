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
    const newPolicyState = createCopy(policy.state)
    for (let i = 0; i < 9; i++) {
      if (policy.state[i] === 'empty') {
        newPolicyState[i] = turnSymbol;

        const newPolicy = Policy(createCopy(newPolicyState), 0, []);
        policy.possibleMoves.push(newPolicy);

        const notAWinner = !(isWinner(newPolicy.state, 'o') || isWinner(newPolicy.state, 'x'));
        if (notAWinner) {
          addPolicy(turnSymbol === 'x' ? 'o' : 'x', newPolicy);
        }

        newPolicyState[i] = 'empty';
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

  function isWinner(boardState: BoardState, symbol: possibleBoardStates) {
    const check = (i) => boardState[i] === symbol;
    const firstColCheck = check(0) && check(3) && check(6);
    const secondColCheck = check(1) && check(4) && check(7);
    const thirdColCheck = check(2) && check(5) && check(8);
    const firstRowCheck = check(0) && check(1) && check(2);
    const secondRowCheck = check(3) && check(4) && check(5);
    const thirdRowCheck = check(6) && check(7) && check(8);
    const firstDiagCheck = check(0) && check(4) && check(8);
    const secondDiagCheck = check(2) && check(4) && check(6);
    return (
      firstColCheck ||
      secondColCheck ||
      thirdColCheck ||
      firstRowCheck ||
      secondRowCheck ||
      thirdRowCheck ||
      firstDiagCheck ||
      secondDiagCheck
    );
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
