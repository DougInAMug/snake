import './style.css'
import { ROWS, COLS, DIRECTIONS, APPLE_COLOR, SNAKE_COLOR, CELL_COLOR, CELL_STYLES, GAME_OVER_STYLES } from  './gameConfig'
import { Coordinate, DirectionKeys } from './type'
import { modulus, coordToId, randomCoord, switchCellColorFromTo } from './utils';

let snakeCells: Array<Coordinate> = [[9, 10], [10, 10], [11, 10]];
let appleCell: number[] = [];
let direction: DirectionKeys = "ArrowRight";
let score: number = 0;
let gameEndCondition: boolean = false;
let snakeMoveSpeed: number = 1000;

function initializeSnakeBoard() {
    const snakeBoard = document.getElementById("snakeBoard")!;
    if (snakeBoard.childElementCount !== 0) {
        while (snakeBoard.firstChild) {
        snakeBoard.removeChild(snakeBoard.firstChild);
        }
    }
    for (let row = 0; row < COLS; row++) {
        for (let col = 0; col < ROWS; col++) {
            let cell = document.createElement("div");
            cell.classList.add(...CELL_STYLES);
            cell.classList.toggle(CELL_COLOR);
            cell.id = coordToId(col, row);
            snakeBoard?.appendChild(cell);
        }
    }
}

function initializeSnake() {
    for (let i = 0; i < snakeCells.length; i++) {
        switchCellColorFromTo(snakeCells[i], CELL_COLOR, SNAKE_COLOR);
    }
}

function moveSnake(direction: DirectionKeys) {
    let head = snakeCells[snakeCells.length - 1];
    let nextHead: Coordinate = [
        modulus(head[0] + DIRECTIONS[direction][0], ROWS),
        modulus(head[1] + DIRECTIONS[direction][1], ROWS)
    ];
    // Check if the snake bites itself, end game
    for (let snakeCell of snakeCells) {
        if (snakeCell[0] == nextHead[0] && snakeCell[1] == nextHead[1]) {
            gameEndCondition = true;
            let gameOver = document.createElement("div");
            gameOver.innerHTML = "Oh dear, you snekked yourself!";
            gameOver.classList.add(...GAME_OVER_STYLES);
            const snakeBoard = document.getElementById("snakeBoard")!;
            snakeBoard?.appendChild(gameOver);
            return;
        }
    };
    // Check to see if nextHead would be an apple, increase score
    // Otherwise remove tail cell
    if (nextHead[0] == appleCell[0] && nextHead[1] == appleCell[1] ) {
        score++;
        const scoreDisplay = document.getElementById("playerScore")!
        scoreDisplay.innerText = `${score}`;
        switchCellColorFromTo(nextHead, SNAKE_COLOR, APPLE_COLOR);
        appleCell = [];
    } else {
        switchCellColorFromTo(nextHead, SNAKE_COLOR, CELL_COLOR);
        let tail: Coordinate = snakeCells[0];
        switchCellColorFromTo(tail, SNAKE_COLOR, CELL_COLOR);
        snakeCells.shift();
    };
    snakeCells.push(nextHead);
}

function placeApple() {
    if (appleCell.length == 0) {
        let placementCoord: Coordinate = randomCoord(COLS, ROWS);;
        while (snakeCells.includes(placementCoord)) {
            placementCoord = randomCoord(COLS, ROWS);
        }
        appleCell.push(...placementCoord);
        switchCellColorFromTo(placementCoord, APPLE_COLOR, CELL_COLOR);
    }
}

function gameLoop() {
    if (gameEndCondition == false) {
        setTimeout(() => {
            window.requestAnimationFrame(gameLoop);
            placeApple();
            moveSnake(direction);
        }, snakeMoveSpeed);
    }
}

function addArrowControl() {
    document.querySelector("html")?.addEventListener("keydown", (e) => {
        if (gameEndCondition === false) {
            switch (e.key) {
                case "ArrowUp":
                    if (direction !== "ArrowDown") {
                        direction = "ArrowUp";
                        moveSnake(direction);
                    }
                    break;
                case "ArrowDown":
                    if (direction !== "ArrowUp") {
                        direction = "ArrowDown"
                        moveSnake(direction);
                    }
                    break;
                case "ArrowLeft":
                    if (direction !== "ArrowRight") {
                        direction = "ArrowLeft";
                        moveSnake(direction);
                    }
                    break;
                case "ArrowRight":
                    if (direction !== "ArrowLeft") {
                        direction = "ArrowRight";
                        moveSnake(direction);
                    }
                    break;
                }
        }
    });
}

document.getElementById("speedSlider")?.addEventListener("change", (e) => {
    if (e.target !== null) {
        let invertedSliderValue = 100 - +(e.target as HTMLInputElement).value;
        snakeMoveSpeed = invertedSliderValue * 10;
    }
})

document.getElementById("buttonStart")?.addEventListener("click", () => {
    snakeCells = [[9, 10], [10, 10], [11, 10]];
    appleCell = [];
    direction = "ArrowRight";
    score = 0;
    gameEndCondition = false;
    snakeMoveSpeed = 1000;
    initializeSnakeBoard();
    initializeSnake();
})

initializeSnakeBoard();
initializeSnake();
addArrowControl();
window.requestAnimationFrame(gameLoop);