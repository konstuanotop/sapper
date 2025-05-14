import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { loadLeaderBoard, savedLeaderBoard, type TableData } from "~/utils/storage";

export interface Values {
    bomb: string;
    empty: string;
    number: Record<string, number>;
}

interface GameState {
    sizeX: number;
    sizeY: number;
    size: number;
    bombs: number;
    sizeArea: number[][];
    bombArea: number[];
    positionBombs: number[][];
    firstClick: boolean;
    clickId: number | null;
    firstClickPositionsId: number[];
    emptyPosition: number[][];
    emptyPositionId: number[];
    counterId: Record<string, number>;
    positionNumbers: number[][];
    numbersBlockId: number[];
    clearPositionNumbersId: number[];
    uniqiePositionsId: number[];
    openedBlocks: number[];
    values: Values;
    flagsIds: number[];
    query: number[];
    isWin: boolean;
    time: number;
    isRunning: boolean;
    isDefeat: boolean;
    tableData: TableData[];
}

const getPosition = (id: number, sizeX: number) => {
    try {
        const positionY = Math.floor(id / sizeX);
        const positionX = Math.floor(id % sizeX);
        return [positionX, positionY]
    } catch (e) {
        console.error('Error in getPosition:', e);
        return [0, 0];
    }
}


const getPositionNumbers = (positionBombs: number[][], sizeX: number, sizeY: number): number[][] => {
    let newPositionNumbers: number[][] = [];
    positionBombs.forEach(([x, y]) => {

        if (y - 1 >= 0) {
            if (x - 1 >= 0) {
                newPositionNumbers.push([x - 1, y - 1])
            }
            newPositionNumbers.push([x, y - 1])
            if (x + 1 < sizeX) {
                newPositionNumbers.push([x + 1, y - 1]);
            }
        }


        if (x - 1 >= 0) {
            newPositionNumbers.push([x - 1, y])
        }
        if (x + 1 < sizeX) {
            newPositionNumbers.push([x + 1, y])
        }


        if (y + 1 < sizeY) {
            if (x - 1 >= 0) {
                newPositionNumbers.push([x - 1, y + 1])
            }
            newPositionNumbers.push([x, y + 1])

            if (x + 1 < sizeX) {
                newPositionNumbers.push([x + 1, y + 1])
            }
        }

    })
    return newPositionNumbers;
};


const getNumberId = (positions: number[][], sizeArea: number[][]): number[] => {
    const newNumbers: number[] = [];
    positions.forEach(([x, y]) => {
        if (sizeArea[y] && sizeArea[y][x] !== undefined) {
            newNumbers.push(sizeArea[y][x]);
        }
    });
    return newNumbers;
}

const getClearPositionNumbersId = (numbers: number[], bombs: number[]) => {
    return numbers.filter(num => !bombs.includes(num));
}


const getUniquePositionsid = (positions: number[]) => {

    const unique = new Set(positions)
    const newUniqiePositionsId: number[] = Array.from(unique);
    return newUniqiePositionsId;
}


const createFirstClickPositions = (firstIdPosition: number[], newFirstClickPositions: number[][], sizeX: number, sizeY: number) => {
    const [x, y] = firstIdPosition;

    if (x < 0 || x >= sizeX || y < 0 || y >= sizeY) return;


    if (y - 1 >= 0) {
        if (x - 1 >= 0) {
            newFirstClickPositions.push([x - 1, y - 1])
        }
        newFirstClickPositions.push([x, y - 1])
        if (x + 1 < sizeX) {
            newFirstClickPositions.push([x + 1, y - 1]);
        }
    }


    if (x - 1 >= 0) {
        newFirstClickPositions.push([x - 1, y])
    }

    newFirstClickPositions.push([x, y])

    if (x + 1 < sizeX) {
        newFirstClickPositions.push([x + 1, y])
    }


    if (y + 1 < sizeY) {
        if (x - 1 >= 0) {
            newFirstClickPositions.push([x - 1, y + 1])
        }
        newFirstClickPositions.push([x, y + 1])

        if (x + 1 < sizeX) {
            newFirstClickPositions.push([x + 1, y + 1])
        }
    }
}

const counterElements = (arr: number[]): Record<string, number> => {
    const countMap: Record<string, number> = {};

    for (const item of arr) {
        const key = String(item);
        countMap[key] = (countMap[key] || 0) + 1;
    }
    return countMap
}

const getEmptyPositionsId = (numbers: number[], bombs: number[], size: number) => {
    const newEmptyPositionId: number[] = [];
    const numbersBombsCollection: number[] = [...numbers, ...bombs];

    for (let i = 0; i < size; i++) {
        if (!numbersBombsCollection.includes(i)) {
            newEmptyPositionId.push(i)
        }
    }
    return newEmptyPositionId;
}

const initialState: GameState = {
    sizeX: 8,
    sizeY: 8,
    size: 8 * 8,
    bombs: 10,
    sizeArea: [],
    bombArea: [],
    positionBombs: [],
    firstClick: true,
    clickId: null,
    firstClickPositionsId: [],
    emptyPosition: [],
    emptyPositionId: [],
    counterId: {},
    positionNumbers: [],
    numbersBlockId: [],
    clearPositionNumbersId: [],
    uniqiePositionsId: [],
    openedBlocks: [],
    values: {
        bomb: '💣',
        empty: '',
        number: {}
    },
    flagsIds: [],
    query: [],
    isWin: false,
    time: 0,
    isRunning: false,
    isDefeat: false,
    tableData: loadLeaderBoard(),
}

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        initializeBoard(state, action: PayloadAction<{ sizeX: number, sizeY: number, bombs: number }>) {
            const { sizeX, sizeY, bombs } = action.payload;
            state.sizeX = sizeX;
            state.sizeY = sizeY;
            state.size = sizeX * sizeY;
            state.bombs = bombs;

            let newSizeArea = new Array(sizeY);
            for (let i = 0; i < newSizeArea.length; i++) {
                newSizeArea[i] = new Array(sizeX);
                for (let j = 0; j < sizeX; j++) {
                    newSizeArea[i][j] = i * sizeX + j;
                }
            }

            state.sizeArea = newSizeArea;
        },

        handleFirstClick(state, action: PayloadAction<number>) {
            const id = action.payload;
            if (state.firstClick) {
                state.firstClick = false;
                state.clickId = id;
                state.openedBlocks = [id];

                const position = getPosition(id, state.sizeX);
                let newFirstClickPositions: number[][] = [];
                createFirstClickPositions(position, newFirstClickPositions, state.sizeX, state.sizeY)
                const newFirstClickPositionsId = getNumberId(newFirstClickPositions, state.sizeArea)
                state.firstClickPositionsId = newFirstClickPositionsId;
            }
        },

        openAfterFirstClick(state) {
            if (state.clickId !== null && state.bombArea.length > 0) {
                const newOpenedBlocks: number[] = [];
                openingSections(state.clickId, newOpenedBlocks, state);
                state.openedBlocks = newOpenedBlocks;
            }
        },

        generateBombs(state) {
            if (!state.firstClick && state.firstClickPositionsId.length > 0) {
                let newBombArea: number[] = [];
                let newPositionBombs: number[][] = [];

                const getRandom = (max: number) => {
                    const num = Math.floor(Math.random() * max);
                    if (!newBombArea.includes(num) && !state.firstClickPositionsId.includes(num)) {
                        newBombArea.push(num);
                    }
                };

                const createBombSize = () => {
                    while (newBombArea.length < state.bombs) {
                        getRandom(state.size)
                    }
                }

                const getPositionBoms = () => {
                    newBombArea.forEach((bomb) => {
                        newPositionBombs.push(getPosition(bomb, state.sizeX));
                    });
                };

                createBombSize();
                getPositionBoms();

                state.bombArea = newBombArea;
                state.positionBombs = newPositionBombs;

                const newPositionNumbers = getPositionNumbers(newPositionBombs, state.sizeX, state.sizeY);
                state.positionNumbers = newPositionNumbers;


                const numbersId = getNumberId(newPositionNumbers, state.sizeArea);
                state.numbersBlockId = numbersId;

                const cleared = getClearPositionNumbersId(numbersId, newBombArea)
                state.clearPositionNumbersId = cleared;

                const uniqueIds = getUniquePositionsid(cleared);
                state.uniqiePositionsId = uniqueIds;

                const counts = counterElements(cleared)
                state.counterId = counts;

                state.values = {
                    bomb: '💣',
                    empty: '',
                    number: counts,
                }

                const empty = getEmptyPositionsId(numbersId, newBombArea, state.size);
                state.emptyPositionId = empty;
            }
        },

        openBlock(state, action: PayloadAction<number>) {
            const id = action.payload;
            if (state.openedBlocks.includes(id) || state.flagsIds.includes(id) || state.query.includes(id) || state.isWin || state.isDefeat) return;

            if (state.bombArea.includes(id)) {
                const newOpenedBlocks: number[] = [...state.openedBlocks, ...state.bombArea]
                state.openedBlocks = newOpenedBlocks;
                state.isDefeat = true;
                return;
            }

            const newOpenedBlocks: number[] = [...state.openedBlocks];
            openingSections(id, newOpenedBlocks, state)
            state.openedBlocks = newOpenedBlocks;
        },


        rightClick(state, action: PayloadAction<number>) {
            const id = action.payload;
            if (state.openedBlocks.includes(id)) return;

            if (!state.flagsIds.includes(id) && !state.query.includes(id) && !state.isWin && !state.isDefeat) {
                const newFlagsIds: number[] = [...state.flagsIds];
                newFlagsIds.push(id);
                state.flagsIds = newFlagsIds;
                return;
            }

            if (state.flagsIds.includes(id) && !state.isWin && !state.isDefeat) {
                const newFlagsIds: number[] = [...state.flagsIds];
                state.flagsIds = newFlagsIds.filter((currentId) => currentId !== id);

                const newQueryIds: number[] = [...state.query];
                newQueryIds.push(id);
                state.query = newQueryIds
                return;
            }

            if (state.query.includes(id)) {
                const newQueryIds: number[] = [...state.query];
                state.query = newQueryIds.filter((currentId) => currentId !== id);
                return;
            }
        },

        resetGame(state) {
            return {
                ...initialState,
                sizeX: state.sizeX,
                sizeY: state.sizeY,
                size: state.size,
                bombs: state.bombs,
                sizeArea: state.sizeArea,
                tableData: state.tableData,
            }
        },


        winGame(state) {
            if (state.isWin) return;
            state.isWin = true;

            const formatTime = () => {
                let seconds = state.time % 60;
                let minutes = Math.floor(state.time / 60);

                return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
            }

            const realPlayer = state.tableData.filter(player => !player.isPlaceholder);
            const nextPlayerNumber = realPlayer.length + 1;

            const newPlayer = {
                place: 0,
                name: prompt('Введите имя') || `Игрок ${nextPlayerNumber}`,
                time: formatTime(),
                timeInSeconds: state.time,
                isPlaceHolder: false,
            }

            const updateTable = [...realPlayer, newPlayer]
                .sort((a, b) => a.timeInSeconds - b.timeInSeconds)
                .slice(0, 10)
                .map((player, index) => ({
                    ...player,
                    place: index + 1,
                }))

            while (updateTable.length < 10) {
                updateTable.push({
                    place: updateTable.length + 1,
                    name: `---`,
                    time: `--:--`,
                    timeInSeconds: 0,
                    isPlaceholder: true
                });
            }

            state.tableData = updateTable;
            savedLeaderBoard(updateTable);

        },

        startTimer(state) {
            state.isRunning = true;
        },

        incrementTimer(state) {
            state.time += 1;
        },

        stopTimer(state) {
            state.isRunning = false;
        },

        resetTimer(state) {
            state.time = 0;
            state.isRunning = false;
        },

        resetTable(state) {
            state.tableData = Array.from({ length: 10 }, (_, i) => ({
                place: i + 1,
                name: `---`,
                time: `--:--`,
                timeInSeconds: 0,
                isPlaceholder: true
            }));
            savedLeaderBoard(state.tableData);
        },
    }
});

const openingSections = (id: number, opened: number[], state: GameState) => {

    if (!state.sizeArea || state.sizeArea.length === 0) return;

    if (Object.keys(state.values.number).length === 0) return;

    const [x, y] = getPosition(id, state.sizeX);

    if (opened.includes(id) || state.flagsIds.includes(id) || state.query.includes(id)) return;

    if (!opened.includes(id)) {
        opened.push(id);
    }

    const shouldContinue = !state.bombArea.includes(id) &&
        (!state.values.number[id.toString()] || id === state.clickId);

    if (y - 1 >= 0) {
        if (x - 1 >= 0) {
            const newId = state.sizeArea[y - 1][x - 1];
            if (shouldContinue) openingSections(newId, opened, state);
        }

        const newIdCenter = state.sizeArea[y - 1][x];
        if (shouldContinue) openingSections(newIdCenter, opened, state);

        if (x + 1 < state.sizeX) {
            const newIdRight = state.sizeArea[y - 1][x + 1];
            if (shouldContinue) openingSections(newIdRight, opened, state);
        }
    }


    if (x - 1 >= 0) {
        const newIdLeft = state.sizeArea[y][x - 1];
        if (shouldContinue) openingSections(newIdLeft, opened, state);
    }

    if (x + 1 < state.sizeX) {
        const newIdRight = state.sizeArea[y][x + 1];
        if (shouldContinue) openingSections(newIdRight, opened, state);
    }


    if (y + 1 < state.sizeY) {
        if (x - 1 >= 0) {
            const newIdBottomLeft = state.sizeArea[y + 1][x - 1];
            if (shouldContinue) openingSections(newIdBottomLeft, opened, state);
        }

        const newIdBottomCenter = state.sizeArea[y + 1][x];
        if (shouldContinue) openingSections(newIdBottomCenter, opened, state);

        if (x + 1 < state.sizeX) {
            const newIdBottomRight = state.sizeArea[y + 1][x + 1];
            if (shouldContinue) openingSections(newIdBottomRight, opened, state);
        }
    }

};

export const {
    initializeBoard,
    handleFirstClick,
    openAfterFirstClick,
    generateBombs,
    openBlock,
    rightClick,
    resetGame,
    winGame,
    startTimer,
    incrementTimer,
    stopTimer,
    resetTimer,
    resetTable,
} = gameSlice.actions;

export default gameSlice.reducer;