import "./Board.css"
import { useEffect, useState } from "react";
import Square from "./Square";
import iWon from '../assets/iWon.gif'

function Board() {

    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);

    function calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {          
                return squares[a];
            }
        }
        return null;
    }

    function checkForTie(squares){
        for(let i=0; i<9; i++){
            if(squares[i] === null || winner){
                return false;
            }
        }
        return true;
    } 

    const winner = calculateWinner(squares);
    const checkTie = checkForTie(squares);

    function clickHandler(i) {
        const squaresCopy = [...squares];
        if(winner || squares[i]) return;

        squaresCopy[i] = xIsNext ? 'X' : 'O';
        setXIsNext(!xIsNext);
        setSquares(squaresCopy);
    }

    const imgStyle = {
        width: '200px',
        transition: 'width 2s ease-in-out'
    }

    const [players, setPlayers] = useState({player1 : "", player2: ""})
    const [showForm, setShowForm] = useState(true);

    const changeHandler = (event) => {
        // const {name, value} = event.target;

        setPlayers((prevPlayers) => ({
            ...prevPlayers, 
            [event.target.name] : event.target.value,
        }));
    }

    function resetHandler() {
        setSquares(Array(9).fill(null));
        setPlayers(players.player1 = "", players.player2 = "");
        setShowForm(true);
    }

        const submitHandler = (event) => {
        event.preventDefault();
        if(players.player1 && players.player1.length > 0 && players.player2.length > 0){
            setShowForm(false);
        }
        else return;

    }

    const winnerName = winner && xIsNext ? (players.player2) : (players.player1);

    return (
        <>

        {
            showForm ? 
            (<form onSubmit={submitHandler} className="formStyle">
            <div>
            <label htmlFor="player1">Player1 : </label>
            <input type="text"
            className="input1"
            placeholder="Player1 Name"
            name="player1"
            value={players.player1}
            onChange={changeHandler}
            />
            </div>

            <div>
            <label htmlFor="player2">Player2 : </label>
            <input type="text"
            placeholder="Player2 Name"
            className="input2"
            name="player2"
            value={players.player2}
            onChange={changeHandler}
            />
            </div>

            <button className="startGame" role="button">Start Game</button>
        </form>)

        : 
        (
            <div>

     {  winner ? 
     (<div>
        <span className="Winner">{"Winner is: " + winnerName}</span> 
        <img src={iWon} className="image" style={imgStyle}/>
        </div>)
        :

        (
            <div>
                {
                    checkTie ?
                (<div>
            <span className="Tie">Oops! it is  a tie</span>
            </div>)
            :
            (<div className="square-grid">
                {
                    squares.map((value, index) => {
                       return <Square key={index} onClick={() => clickHandler(index)} value={value} />
                    } )
                }
            </div>)
                }
            </div>
        )
      
}

        <button className="button-33" onClick={resetHandler}>Reset</button>
        <img src={iWon} className="image" />
        </div>
        )
    }

        </>
    )
}

export default Board;