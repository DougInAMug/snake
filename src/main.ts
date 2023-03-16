import './style.css'
import { ROWS, COLS } from  './gameConfig'
import { Coordinate, DirectionKeys } from './type'

const appleColor = "bg-red-500";
const snakeColor = "bg-green-500";
const cellColor  = "bg-slate-200";
const cellStyles = ["h-4", "w-4", "border-black", "border-1", "border-solid"];

const snakeCells: Array<Coordinate> = [];
const initialSnakeCells: Array<Coordinate> = [[9, 10], [10, 10], [11, 10]];
let   appleCell: number[] = []
let applePresent: boolean = false;
let direction: DirectionKeys = "R";
let score: number = 0;
let gameEndCondition: boolean = false;

const directions = { 
    U: [ 0, -1],
    D: [ 0,  1],
    L: [-1,  0],
    R: [ 1,  0]
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
        switchCellColorFromTo(initialSnakeCells[i], cellColor, snakeColor)
        snakeCells.push(initialSnakeCells[i]);
    }
}

function snakeMove(direction: DirectionKeys) {
    // remove cell at end of snake

    // at new cell to start of snake, based on direction
    let head = snakeCells[snakeCells.length - 1];
    let nextHead0 = modulus(head[0] + directions[direction][0], ROWS);
    let nextHead1 = modulus(head[1] + directions[direction][1], ROWS);
    let nextHead: Coordinate = [nextHead0, nextHead1]
    if (nextHead[0] == appleCell[0] && nextHead[1] == appleCell[1] ) {
        score++;
        const scoreDisplay = document.getElementById("playerScore")!
        scoreDisplay.innerText = `${score}`;
        switchCellColorFromTo(nextHead, snakeColor, appleColor);
        applePresent = false;
        appleCell = [];
        gameEndCondition = true;
    } else {
        switchCellColorFromTo(nextHead, snakeColor, cellColor);
        let tail: Coordinate = snakeCells[0];
        switchCellColorFromTo(tail, snakeColor, cellColor);
        snakeCells.shift();
    }
    snakeCells.push(nextHead);
}

function placeApple() {
    if (applePresent === false) {
        let placementCoord: Coordinate = randomCoord();;
        while (snakeCells.includes(placementCoord)) {
            placementCoord = randomCoord();
        }
        appleCell.push(...placementCoord);
        console.log(appleCell);
        switchCellColorFromTo(placementCoord, appleColor, cellColor);
    }
    applePresent = true;
}


function gameLoop() {
    if (gameEndCondition == false) {
        setTimeout(() => {
            window.requestAnimationFrame(gameLoop)
            placeApple()
            snakeMove(direction);
        }, 1000)
    }
}

window.requestAnimationFrame(gameLoop);

createGame();
initializeSnake();


let readArea = document.querySelector("html");
readArea?.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") {
        let arrowDirection: DirectionKeys = "U";
        if (direction !== "D") {
            direction = arrowDirection;
            snakeMove("U")
        }
    } else if (e.key === "ArrowDown") {
        let arrowDirection: DirectionKeys = "D";
        if (direction !== "U") {
            direction = arrowDirection;
            snakeMove("D")
        }
    } else if (e.key === "ArrowLeft") {
        let arrowDirection: DirectionKeys = "L";
        if (direction !== "R") {
            direction = arrowDirection;
            snakeMove("L")
        }
    } else if (e.key === "ArrowRight") {
        let arrowDirection: DirectionKeys = "R";
        if (direction !== "L") {
            direction = arrowDirection;
            snakeMove("R")
        }
    }
})
