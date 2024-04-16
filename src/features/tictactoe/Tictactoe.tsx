import { useAppSelector } from '../../app/hooks';
import { gameRestarted, movePlayed, selectBoard } from './TictactoeSlice';
import { useDispatch } from 'react-redux';
import './tictactoe.css';
import { selectPlayer } from '../counter/counterSlice';

export function Tictactoe() {
  const dispatch = useDispatch()
  const board = useAppSelector(selectBoard)
  const player = useAppSelector(selectPlayer)

  const rows = [board.slice(0, 3), board.slice(3, 6), board.slice(6)]

  const boardUi = rows.map((row, rowIndex) =>
    <div key={'r' + rowIndex}>
      {row.map((cell, cellIndex) => <button className={'cellbutton'} key={'c' + rowIndex * 3 + cellIndex} onClick={() => {
        let targetCell = rowIndex * 3 + cellIndex;
        dispatch(movePlayed(targetCell))
        console.log(targetCell);
      }}>{cell != '.' ? cell : ''}</button>)}
    </div>)

  return (<>
    <h1>Welcome to tic tac toe</h1>
    <h3>Active player: {player}</h3>
    {boardUi}
    <button onClick={() => dispatch(gameRestarted())} className="button">New game</button>
  </>)

}