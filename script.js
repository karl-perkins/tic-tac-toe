function createGameboard() {
	const gameboard = [];

	for (let i = 0; i < 3; i++) {
		gameboard[i] = [];
		for (let j = 0; j < 3; j++) {
			gameboard[i].push(createCell());
		}
	}

	function displayGameboard() {
		console.log(gameboard[0].map((cell) => cell.getValue()).join('|'));
		console.log(gameboard[1].map((cell) => cell.getValue()).join('|'));
		console.log(gameboard[2].map((cell) => cell.getValue()).join('|'));
	}

	function updateGameboard(rowId, columnId, value) {
		gameboard[rowId][columnId].setValue(value);
	}

	return { displayGameboard, updateGameboard };
}

function createCell() {
	let value = 0;
	const getValue = () => value;
	const setValue = (player) => (value = player);

	return { value, getValue, setValue };
}

const gameboard = createGameboard();
