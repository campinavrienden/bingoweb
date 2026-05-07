export interface IBingo {
    max: number;
    values: number[];
}

export interface IBingoInfo {
    nextBingo: string  | undefined;
    isBreak: boolean | undefined;
    isBingo: boolean | undefined;
}