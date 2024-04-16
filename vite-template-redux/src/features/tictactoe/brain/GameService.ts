export const O = 'O';

export const X = 'X';

export function findWinner(board: string[]) : string | null {
  let winner = null
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  winningCombos.forEach(
    combo => {
      let first = board[combo[0]];
      let second = board[combo[1]];
      let third = board[combo[2]];
      [X, O].forEach(player => {
        if (first === player && second === player && third === player) {
          winner = player
        }
      })
    }
  )
  return winner;
}


export function findPossibleMoves(board: string[]) {
  const result = []
  for (let i = 0; i < 9; i++) {
    if (board[i] === '.') {
      result.push(i)
    }
  }
  return result
}

export function playMove(board: string[], targetCell: number) {
  const winner = findWinner(board)
  if (winner != null) {
    throw new Error(`Cannot play move. Game is over. Winner: ${winner}.`);
  }
  if (board[targetCell] !== '.') {
    throw new Error(`Cannot move to cell ${targetCell}. It is occupied by ${board[targetCell]}.`);
  }

  const boardCopy = board.slice()
  boardCopy[targetCell] = findActivePlayer(board);
  return boardCopy;
}

function findActivePlayer(board: string[]) {
  const xCount = board.filter(c => c === X).length
  const oCount = board.filter(c => c === O).length
  return xCount > oCount ? O : X
}
