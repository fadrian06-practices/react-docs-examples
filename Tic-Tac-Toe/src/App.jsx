import { useState } from "react";

function Square({ value, onSquareClick }) {
	return (
		<button className="square" onClick={onSquareClick}>
			{value}
		</button>
	);
}

function Board({ xIsNext, squares, onPlay }) {
	function handleClick(index) {
		if (calculateWinner(squares) || squares[index]) {
			return;
		}

		const nextSquares = squares.slice();

		if (xIsNext) {
			nextSquares[index] = "X";
		} else {
			nextSquares[index] = "O";
		}

		onPlay(nextSquares);
	}

	const winner = calculateWinner(squares);
	let status = `Next player: ${xIsNext ? "X" : "O"}`;

	if (winner) {
		status = `Winner: ${winner}`;
	}

	return (
		<>
			<div className="status">{status}</div>
			{Array(3)
				.fill(null)
				.map((_, rowIndex) => (
					<div className="board-row" key={rowIndex}>
						{Array(3)
							.fill(null)
							.map((_, colIndex) => {
								const squareIndex = rowIndex * 3 + colIndex;

								return (
									<Square
										key={squareIndex}
										value={squares[squareIndex]}
										onSquareClick={() => handleClick(squareIndex)}
									/>
								);
							})}
					</div>
				))}
		</>
	);
}

export default function Game() {
	const [history, setHistory] = useState([Array(9).fill(null)]);
	const [currentMove, setCurrentMove] = useState(0);

	const currentSquares = history[currentMove];
	const xIsNext = currentMove % 2 === 0;

	function handlePlay(nextSquares) {
		const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

		setHistory(nextHistory);
		setCurrentMove(nextHistory.length - 1);
	}

	function jumpTo(nextMove) {
		setCurrentMove(nextMove);
	}

	const moves = history.map((_, move) => {
		let description = "Go to game start";

		if (move > 0) {
			description = `Go to move #${move}`;
		}

		return (
			<li key={move}>
				{move === currentMove ? (
					`You are at move #${move}`
				) : (
					<button onClick={() => jumpTo(move)}>{description}</button>
				)}
			</li>
		);
	});

	return (
		<div className="game">
			<div className="game-board">
				<Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
			</div>
			<div className="game-info">
				<ol>{moves}</ol>
			</div>
		</div>
	);
}

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

	for (let index = 0; index < lines.length; ++index) {
		const [a, b, c] = lines[index];

		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}

	return null;
}
