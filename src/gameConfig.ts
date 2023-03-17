import { DirectionKeys, Coordinate } from './type'

// number of board cols and rows
export const ROWS = 21;
export const COLS = 21;
export const SNAKE_CELLS: Array<Coordinate> = [[9, 10], [10, 10], [11, 10]];
export const APPLE_CELL: number[] = [];
export const DIRECTION: DirectionKeys = "ArrowRight";
export const SCORE: number = 0;
export const GAME_END_CONDITION: boolean = false;
export const SNAKE_MOVE_SPEED: number = 1000;

export const DIRECTIONS = { 
    "ArrowUp":    [ 0, -1],
    "ArrowDown":  [ 0,  1],
    "ArrowLeft":  [-1,  0],
    "ArrowRight": [ 1,  0]
}

// Colours and styles
export const APPLE_COLOR = "bg-red-500";
export const SNAKE_COLOR = "bg-green-500";
export const CELL_COLOR  = "bg-slate-200";
export const CELL_STYLES = ["h-4", "w-4", "border-black", "border-1", "border-solid"];
export const GAME_OVER_STYLES = ["absolute", "flex", "items-center", "justify-center", "text-5xl", "font-bold", "top-0", "bottom-0", "left-0", "right-0", "bg-black", "bg-opacity-50", "text-white", "text-center"];
