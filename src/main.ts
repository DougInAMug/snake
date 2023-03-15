import './style.css'
import { ROWS, COLS } from  './gameConfig'
import { Coordinate, DirectionKeys } from './type'

const cellStyles = ["h-4", "w-4", "border-black", "border-1", "border-solid", "bg-slate-200"];

const snakeStyle = "bg-green-500";
const appleStyle = "bg-red-500";

const snakeCells: Array<Coordinate> = [];

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
    let randCol = Math.round(Math.random() * COLS);
    let randRow = Math.round(Math.random() * ROWS);
    let randCoord: Coordinate = [randCol, randRow];
    return randCoord;
};

function createGame() {
    const snakeBoard = document.getElementById("snakeBoard");
    for (let row = 0; row < COLS; row++) {
        for (let col = 0; col < ROWS; col++) {
            let cell = document.createElement("div");
            cell.classList.add(...cellStyles);
            cell.id = coordToId(col, row);
            snakeBoard?.appendChild(cell);
        }
    }
}

function initializeSnake() {
    const initialCells: Array<Coordinate> = [[10, 9], [10, 10], [10, 11]];
    for (let i = 0; i < initialCells.length; i++) {
        document.getElementById(`${coordToId(...initialCells[i])}`)?.classList.toggle(snakeStyle);
        snakeCells.push(initialCells[i]);
    }
}

function snakeMove(direction: DirectionKeys) {
    // remove cell at end of snake
    let tail: Coordinate = snakeCells[0];
    document.getElementById(`${coordToId(...tail)}`)?.classList.toggle(snakeStyle);
    snakeCells.shift();
    // at new cell to start of snake, based on direction
    let head = snakeCells[snakeCells.length - 1];
    let nextHead0 = modulus(head[0] + directions[direction][0], ROWS);
    let nextHead1 = modulus(head[1] + directions[direction][1], ROWS);
    let nextHead: Coordinate = [nextHead0, nextHead1]
    document.getElementById(`${coordToId(...nextHead)}`)?.classList.toggle(snakeStyle);
    snakeCells.push(nextHead);
}

let applePresent = false

function placeApple() {
    if (applePresent === false) {
        let placementCoord: Coordinate = [10, 11];
        while (snakeCells.includes(placementCoord)) {
            placementCoord = randomCoord();
        }
        console.log("hi", document.getElementById(`${coordToId(...placementCoord)}`)?.classList.toggle(appleStyle));
    }
    applePresent = true;
}

function gameLoop() {
    setTimeout(() => {
        window.requestAnimationFrame(gameLoop)
    }, 1000)
    placeApple()
    snakeMove(direction);
}

window.requestAnimationFrame(gameLoop);

createGame();

initializeSnake();

let direction: DirectionKeys = "R";

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
