import { getRandom } from "../tables/generateRandomMatrix";

export const putComodin = (_array: number[][], figureId: number, center?: boolean, edges?: boolean) => {
    console.log(center, edges)
    const tableWithComodin = _array;
    const randomPlace = (): { x: number; y: number } => {
        const row: number = getRandom(
            0,
            tableWithComodin.length - 1
        );
        const column: number = getRandom(
            0,
            tableWithComodin.length - 1
        );
        //return { x: row, y: column };
        console.log(row, column);
        return { x: column, y: row };
    };
    const place: { x: number; y: number } = randomPlace();
    tableWithComodin[place.x][place.y] = figureId;
    return tableWithComodin;
}

export const putDoubleComodin = (_array: number[][], figureId: number) => {
    const tableWithComodin = _array;

    const getRandomEdge = (): {x: number; y: number} => {
        const edge: number = getRandom(0,3);
        const size = tableWithComodin[0].length -1;
        console.log("SIZE: ",size)
        switch(edge) {
            case 0:
                return {x: 0, y: 0};
            case 1:
                return {x: size, y: 0};
            case 2:
                return {x: 0, y: size};
            case 3:
                return {x: size, y: size};
            default:
                return {x: 0, y: 0};
        }
    }
    const getCenter = (): {x: number, y: number} => {
        const size = tableWithComodin[0].length;
        return {x: Math.floor(size/2), y: Math.floor(size/2)};        
    
    }
    
    const edgePlace: {x: number, y: number} = getRandomEdge();
    const centerPlace: {x: number, y: number} = getCenter();
    console.log(edgePlace, centerPlace)
    tableWithComodin[edgePlace.x][edgePlace.y] = figureId;
    tableWithComodin[centerPlace.x][centerPlace.y] = figureId;
    return tableWithComodin;
}