# tic-tac-toe-rl-implementation
Created the extended tic tac toe reinforcement learning example from the Barto and Sutton reinforcement learning book in typescript. The reinforcement learning was added on top of my past project, which was just a regular tic tac toe game: https://github.com/Joel-Singh/tic-tac-toe

# How it works
The reinforcement learning happens as you play games and the policies are reset when the page is refreshed. Exploration wasn't implemented, so it plays maximally greedy. The value of winning states are 1, losing states are 0, and everything else is 0.5. Try playing the same first couple of moves and see how it learns.

# Interesting code snippets
Implementation of a policy type. Each policy also keeps track of the possible next policies from it.
```typescript
// @ts-ignore
function Policy(state: BoardState, value: number, possibleMoves: ReturnType<typeof Policy>[]) {
  return {
    state,
    value,
    possibleMoves: possibleMoves as ReturnType<typeof Policy>[]
  }
}
export type Policy = ReturnType<typeof Policy>
```

Here is how I create all possible policies. Recursively as a tree. Reino represents the rl player.
```typescript
// assume Reino always goes second and is x
export function createAllPossiblePolicies() {
  const initialPolicy = Policy(createEmptyBoardState(), 0, []);

  function addPolicy(turnSymbol: possibleBoardStates, policy: Policy) {
    const newPolicyState = createCopy(policy.state)
    for (let i = 0; i < 9; i++) {
      if (policy.state[i] === 'empty') {
        newPolicyState[i] = turnSymbol;

        const newPolicy = Policy(createCopy(newPolicyState), 0, []);

        const xWinning = isWinner(newPolicyState, 'x');
        const oWinning = isWinner(newPolicyState, 'o');

        if (xWinning) {
          newPolicy.value = 1;
        } else if (oWinning) {
          newPolicy.value = 0;
        } else {
          newPolicy.value = 0.5;
        }

        policy.possibleMoves.push(newPolicy);

        const notAWinner = !(xWinning || oWinning);
        if (notAWinner) {
          addPolicy(turnSymbol === 'x' ? 'o' : 'x', newPolicy);
        }

        newPolicyState[i] = 'empty';
      } else {
        policy.possibleMoves.push(null);
      }
    }
  }

  addPolicy('o', initialPolicy);
  return initialPolicy;

  }
}
```

Function to update policies
```typescript
  // equation on page 10 of rl by barto and sutton second edition: V(S_t) <- V(S_t) + a[V(S_t+1) - V(S_t)]
  function updatePolicy(currentPolicy: Policy, previousPolicy: Policy) {
    const stepSizeParameter = 1;
    previousPolicy.value = previousPolicy.value + stepSizeParameter*(currentPolicy.value - previousPolicy.value);
  }
```

![](./project-screenshot.png)

# Live Demo
https://joel-singh.github.io/tic-tac-toe-rl-implementation/
