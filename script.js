function createGameboard() {
	const gameboard = [];

	for (let i = 0; i < 3; i++) {
		gameboard[i] = [];
		for (let j = 0; j < 3; j++) {
			gameboard[i].push(createCell());
		}
	}

	function displayBoard() {
		console.log(gameboard[0].map((cell) => cell.getValue()).join(' | '));
		console.log(gameboard[1].map((cell) => cell.getValue()).join(' | '));
		console.log(gameboard[2].map((cell) => cell.getValue()).join(' | '));
	}

	function resetBoard() {
		gameboard.forEach(row => row.forEach(cell => cell.setValue(' ')));
	}

	function setCellValue(rowId, columnId, value) {
		gameboard[rowId][columnId].setValue(value);
	}

	function getCellValue(rowId, columnId) {
		return gameboard[rowId][columnId].getValue();
	}

	return { displayBoard, resetBoard, setCellValue, getCellValue };
}

function createCell() {
	let value = ' ';
	const getValue = () => value;
	const setValue = (player) => (value = player);

	return { getValue, setValue };
}

function createPlayer(name, marker) {
	let winCount = 0;
	const getWinCount = () => winCount;
	const setWinCount = () => winCount++
	return { name, marker, getWinCount, setWinCount };
}

const gameController = (function (name1, name2) {
	const gameboard = createGameboard();
	const players = [ createPlayer(name1, 'X'), createPlayer(name2, 'O') ];
	const winCombos = [
		//Row
		[[0, 0], [0, 1], [0, 2]],
		[[1, 0], [1, 1], [1, 2]],
		[[2, 0], [2, 1], [2, 2]],

		//Column
		[[0, 0], [1, 0], [2, 0]],
		[[0, 1], [1, 1], [2, 1]],
		[[0, 2], [1, 2], [2, 2]],
		
		//Diagonal
		[[0, 0], [1, 1], [2, 2]],
		[[0, 2], [1, 1], [2, 0]],
	];

	function playRound() {
		let activePlayer;
		let isTrue = true;
		
		while (isTrue) {
			activePlayer = (activePlayer === players[0]) ? players[1] : players[0];

			// Add handling for invalid input and check if cell already populated.
			const row = window.prompt(`${activePlayer.name}, choose a row:`);
			const column = window.prompt(`${activePlayer.name}, choose a column:`);
			
			gameboard.setCellValue(row, column, activePlayer.marker);

			gameboard.displayBoard();

			const isWin = winCombos.some(combo => combo.every(cell => gameboard.getCellValue(cell[0], cell[1]) === activePlayer.marker));
			if (isWin) {
				isTrue = false;
				activePlayer.setWinCount();
				console.log(`${activePlayer.name} wins!`);
			}
		}
		
		gameboard.resetBoard();
	}

	return { playRound };

})('karl', 'simon')