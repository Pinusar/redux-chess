import { GameEngine } from '../aiService';
import { AbstractGameState, AbstractMove } from '../types';

export class TestGameEngine extends GameEngine<TestGameState, TestGameMove> {
  evaluate(gameState: TestGameState): number {
    return gameState.rootNode.score;
  }

  getMoves(gameState: TestGameState): TestGameMove[] {
    return gameState.rootNode.children.map(node => {
      return { target: node.name };
    })
  }

  isTerminalState(gameState: TestGameState): boolean {
    return gameState.rootNode.children.length === 0;
  }

  playMove(gameState: TestGameState, move: TestGameMove): TestGameState {
    const workingState = JSON.parse(JSON.stringify(gameState))
    workingState.rootNode = gameState.rootNode.children.find(node => node.name === move.target)
    return workingState;
  }

}

interface TestGameState extends AbstractGameState {
  rootNode: GameNode
}

interface TestGameMove extends AbstractMove {
  target: string
}

interface GameNode {
  score: number,
  name: string
  children: GameNode[]
}

/*

              Start
        /      |              \
   B (1)     C(3)              D(-8)
     |          |  \               \
 E(2) F(1)    G(-7) N(-3)           H(-8)  I(-1)
              /  \      |                     \
          J(-10) K(3)  O(7) P(-10)            L(7)
                                                 \
                                               M (-10)
 */
export const sampleGameState : TestGameState = {
  rootNode: {
    score: 3,
    name: 'A',
    children: [
      {
        score: -1,
        name: 'B',
        children: [
          {
            score: 2,
            name: 'E',
            children: []
          },
          {
            score: 1,
            name: 'F',
            children: []
          }
        ]
      },
      {
        score: 2,
        name: 'C',
        children: [
          {
            score: -7,
            name: 'G',
            children: [
              {
                score: -10,
                name: 'J',
                children: []
              },
              {
                score: 3,
                name: 'K',
                children: []
              }
            ]
          },
          {
            score: -10,
            name: 'N',
            children: [
              {
                score: 7,
                name: 'O',
                children: []
              },
              {
                score: -10,
                name: 'P',
                children: []
              }
            ]
          }
        ]
      },
      {
        score: 4,
        name: 'D',
        children: [
          {
            score: -8,
            name: 'H',
            children: []
          },
          {
            score: -1,
            name: 'I',
            children: [
              {
                score: 7,
                name: 'L',
                children: [
                  {
                    score: -10,
                    name: 'M',
                    children: []
                  }
                ]
              }
            ]
          }
        ]
      },
    ]
  }
}