import './style.css'
import { ROWS, COLS } from  './gameConfig'
import { Coordinate, DirectionKeys } from './type'


// Colours and styles
const appleColor = "bg-red-500";
const snakeColor = "bg-green-500";
const cellColor  = "bg-slate-200";
const cellStyles = ["h-4", "w-4", "border-black", "border-1", "border-solid"];

// Game initialization stuff
const snakeCells: Array<Coordinate> = [];
const initialSnakeCells: Array<Coordinate> = [[9, 10], [10, 10], [11, 10]];
let   appleCell: number[] = [];
let   direction: DirectionKeys = "ArrowRight";
let   score: number = 0;
let   gameEndCondition: boolean = false;

const directions = { 
    "ArrowUp":    [ 0, -1],
    "ArrowDown":  [ 0,  1],
    "ArrowLeft":  [-1,  0],
    "ArrowRight": [ 1,  0]
}

function modulus(n: number, m: number) {
    return ((n % m) + m) % m;
}

function coordToId(...coords: Coordinate) {
    return `${coords[0]}-${coords[1]}`
};

function randomCoord(): Coordinate {
    let randCol = Math.round(Math.random() * (COLS - 1));
    let randRow = Math.round(Math.random() * (ROWS - 1));
    let randCoord: Coordinate = [randCol, randRow];
    return randCoord;
};

function switchCellColorFromTo(coord: Coordinate, colorInitial: string, colorFinal: string) {
    let cell = document.getElementById(`${coordToId(...coord)}`);
    cell?.classList.toggle(colorInitial);
    cell?.classList.toggle(colorFinal);
}

function createGame() {
    const snakeBoard = document.getElementById("snakeBoard");
    for (let row = 0; row < COLS; row++) {
        for (let col = 0; col < ROWS; col++) {
            let cell = document.createElement("div");
            cell.classList.add(...cellStyles);
            cell.classList.toggle(cellColor);
            cell.id = coordToId(col, row);
            snakeBoard?.appendChild(cell);
        }
    }
}

function initializeSnake() {
    for (let i = 0; i < initialSnakeCells.length; i++) {
        switchCellColorFromTo(initialSnakeCells[i], cellColor, snakeColor);
        snakeCells.push(initialSnakeCells[i]);
    }
}

function snakeMove(direction: DirectionKeys) {
    let head = snakeCells[snakeCells.length - 1];
    let nextHead0 = modulus(head[0] + directions[direction][0], ROWS);
    let nextHead1 = modulus(head[1] + directions[direction][1], ROWS);
    let nextHead: Coordinate = [nextHead0, nextHead1];

    for (let snakeCell of snakeCells) {
        if (snakeCell[0] == nextHead[0] && snakeCell[1] == nextHead[1]) {
            gameEndCondition = true;
            return;
        }
    }

    if (nextHead[0] == appleCell[0] && nextHead[1] == appleCell[1] ) {
        score++;
        const scoreDisplay = document.getElementById("playerScore")!
        scoreDisplay.innerText = `${score}`;
        switchCellColorFromTo(nextHead, snakeColor, appleColor);
        appleCell = [];
    } else {
        switchCellColorFromTo(nextHead, snakeColor, cellColor);
        let tail: Coordinate = snakeCells[0];
        switchCellColorFromTo(tail, snakeColor, cellColor);
        snakeCells.shift();
    }
    snakeCells.push(nextHead);
}

function placeApple() {
    if (appleCell.length == 0) {
        let placementCoord: Coordinate = randomCoord();;
        while (snakeCells.includes(placementCoord)) {
            placementCoord = randomCoord();
        }
        appleCell.push(...placementCoord);
        switchCellColorFromTo(placementCoord, appleColor, cellColor);
    }
}

function gameLoop() {
    if (gameEndCondition == false) {
        setTimeout(() => {
            window.requestAnimationFrame(gameLoop);
            placeApple();
            snakeMove(direction);
        }, 1000);
    }
}

window.requestAnimationFrame(gameLoop);

createGame();
initializeSnake();

document.querySelector("html")?.addEventListener("keydown", (e) => {
    if (gameEndCondition === false) {
        switch (e.key) {
            case "ArrowUp":
                if (direction !== "ArrowDown") {
                    direction = "ArrowUp";
                    snakeMove(direction);
                }
                break;
            case "ArrowDown":
                if (direction !== "ArrowUp") {
                    direction = "ArrowDown"
                    snakeMove(direction);
                }
                break;
            case "ArrowLeft":
                if (direction !== "ArrowRight") {
                    direction = "ArrowLeft";
                    snakeMove(direction);
                }
                break;
            case "ArrowRight":
                if (direction !== "ArrowLeft") {
                    direction = "ArrowRight";
                    snakeMove(direction);
                }
                break;
        }
    }
});
