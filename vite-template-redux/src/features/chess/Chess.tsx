import { useAppSelector } from '../../app/hooks';
import {
  cellClicked, gameModeChanged,
  gameRestarted,
  selectBoard, selectComputerMoveFrom, selectComputerMoveTo,
  selectPossibleMoves, selectPossibleMovesNotation,
  selectSelectedCell, selectTwoPlayerMode,
} from './ChessSlice';
import { useDispatch } from 'react-redux';
import './chess.css'
import { isBlack } from './engine/GameServiceFacade';



export function Chess() {
  const dispatch = useDispatch()
  const rows = useAppSelector(selectBoard)
  const pvpEnabled = useAppSelector(selectTwoPlayerMode)
  const selectedCell = useAppSelector(selectSelectedCell)
  const computerMoveFrom = useAppSelector(selectComputerMoveFrom)
  const computerMoveTo = useAppSelector(selectComputerMoveTo)
  const possibleMoves = useAppSelector(selectPossibleMoves)
  const possibleMovesNotation = useAppSelector(selectPossibleMovesNotation)

  function getClassName(rowIndex :number, cellIndex: number) {
    let targetCell = rowIndex * 8 + cellIndex;
    let baseColor = isBlack(rowIndex * 8 + cellIndex) ? 'blackCell' : 'whiteCell';
    if (computerMoveFrom !== null && (targetCell === computerMoveFrom || targetCell === computerMoveTo)) {
      baseColor += ' computerMove'
    }
    if (selectedCell === targetCell) {
      baseColor += ' selected'
    } else if (possibleMoves.includes(targetCell)) {
      baseColor += ' possibleMove'
    }
    return baseColor;
  }


  const boardUi = rows.map((row, rowIndex) =>
    <div key={'r' + rowIndex}>
      <span>{indexToRowNumber(rowIndex)}</span>
      {row.map((cell, cellIndex) => <button className={getClassName(rowIndex, cellIndex)} key={'c' + (rowIndex * 8 + cellIndex)} onClick={() => {
        let targetCell = rowIndex * 8 + cellIndex;
        dispatch(cellClicked(targetCell))
      }}>{cell.symbol != '.' ? toChessIcon(cell.symbol) : '‎'}</button>)}
    </div>)

  return (<>
    <h1>Welcome to chess</h1>
    {boardUi}
    <button onClick={() => dispatch(gameRestarted())} className="button">New game</button>
    <button onClick={() => dispatch(gameModeChanged())} className="button">{pvpEnabled ? 'PVE' : 'PVP'}</button>
    <br/>
    <br/>
    <br/>
  </>)

}

function indexToRowNumber(rowIndex : number) {
  return ['8', '7', '6', '5', '4', '3', '2', '1'][rowIndex]
}

function toChessIcon(letter: string) {
  let map = {
    'P' : '♙',
    'R' : '♖',
    'N' : '♘',
    'B' : '♗',
    'Q' : '♕',
    'K' : '♔',
    'p' : '♟',
    'r' : '♜',
    'n' : '♞',
    'b' : '♝',
    'q' : '♛',
    'k' : '♚',
  }
  // @ts-ignore
  return map[letter] ?? letter;
}