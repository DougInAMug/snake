import { Coordinate } from './type'

export function modulus(n: number, m: number) {
    return ((n % m) + m) % m;
}

export function coordToId(...coords: Coordinate) {
    return `${coords[0]}-${coords[1]}`
};

export function randomCoord(cols: number, rows: number): Coordinate {
    let randCol = Math.round(Math.random() * (cols - 1));
    let randRow = Math.round(Math.random() * (rows - 1));
    let randCoord: Coordinate = [randCol, randRow];
    return randCoord;
};

export function switchCellColorFromTo(coord: Coordinate, colorInitial: string, colorFinal: string) {
    let cell = document.getElementById(`${coordToId(...coord)}`);
    cell?.classList.toggle(colorInitial);
    cell?.classList.toggle(colorFinal);
}