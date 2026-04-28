export interface IBingo {
    max: number;
    values: number[];
    isBingo: boolean;
}

export interface IBingoInfo {
    nextBingo: Date;
    isBreak: boolean;
}