function createGameboard() {
	const gameboard = [];

	for (let i = 0; i < 3; i++) {
		gameboard[i] = [];
		for (let j = 0; j < 3; j++) {
			gameboard[i].push(createCell());
		}
	}

	function resetBoard() {
		gameboard.forEach(row => row.forEach(cell => cell.setValue(' ')));
	}

	function getBoard() {
		return gameboard;
	};

	function setCellValue(rowId, columnId, value) {
		gameboard[rowId][columnId].setValue(value);
	}

	function getCellValue(rowId, columnId) {
		return gameboard[rowId][columnId].getValue();
	}

	return { resetBoard, getBoard, setCellValue, getCellValue };
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

const gameController = (function () {
	const player1Name = 'karl';//prompt("Enter name for 1st player:");
	const player2Name = 'simon';//prompt("Enter name for 2nd player:");
	const gameboard = createGameboard();
	const players = [ createPlayer(player1Name, 'X'), createPlayer(player2Name, 'O') ];
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
	
	let activePlayer = players[0];
	const getActivePlayer = () => activePlayer;
	const getPlayer1 = () => players[0];
	const getPlayer2 = () => players[1];

	let roundNum = 0;
	function playRound(row, column) {
		if (gameboard.getCellValue(row, column) !== ' ') {
			alert('Cell already populated. Please try again.');
		} else {
			roundNum += 1
			gameboard.setCellValue(row, column, activePlayer.marker);
			
			const isWin = winCombos.some(combo => combo.every(cell => gameboard.getCellValue(cell[0], cell[1]) === activePlayer.marker));
			if (isWin) {
				isTrue = false;
				activePlayer.setWinCount();
				gameboard.resetBoard();
				roundNum = 0;
				alert(`${activePlayer.name} wins!`);
			}

			if (roundNum > 8) {
				alert('Tie. Board reset.');
				roundNum = 0;
				gameboard.resetBoard();
			}

			activePlayer = (activePlayer === players[0]) ? players[1] : players[0];
		}
	}

	return { gameboard, getActivePlayer, getPlayer1, getPlayer2, playRound };
})();

const displayController = (function (gameController) {

	const gameboardElement = document.querySelector('#gameboard');
	function updateScreen(gameboard) {
		gameboardElement.innerHTML = '';

		gameboard.forEach((row, rowIndex) => {
			row.forEach((ele, columnIndex) => {
				const cell = document.createElement('div');
				cell.dataset.rowIndexNumber = rowIndex;
				cell.dataset.columnIndexNumber = columnIndex;
				cell.textContent = ele.getValue();
				gameboardElement.append(cell);
			});

			document.querySelector('#player1 > .name').textContent = gameController.getPlayer1().name;
			document.querySelector('#player2 > .name').textContent = gameController.getPlayer2().name;

			document.querySelector('#player1 > .score').textContent = gameController.getPlayer1().getWinCount();
			document.querySelector('#player2 > .score').textContent = gameController.getPlayer2().getWinCount();
		});
	}

	function clickHandler() {
		gameboardElement.addEventListener('click', e => {
			const rowId = e.target.getAttribute('data-row-index-number');
			const columnId = e.target.getAttribute('data-column-index-number');
			gameController.playRound(rowId, columnId);
			updateScreen(gameController.gameboard.getBoard());
		});
	}


	updateScreen(gameController.gameboard.getBoard());
	clickHandler();

})(gameController);