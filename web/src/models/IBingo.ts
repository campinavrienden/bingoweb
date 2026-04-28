export interface IBingo {
    max: number;
    values: number[];
}

export interface IBingoInfo {
    nextBingo: Date | undefined;
    isBreak: boolean | undefined;
    isBingo: boolean | undefined;
}