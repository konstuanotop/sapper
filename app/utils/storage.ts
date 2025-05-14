export interface TableData {
    place: number;
    name: string;
    time: string;
    timeInSeconds: number;
    isPlaceholder?: boolean;
}

export const loadLeaderBoard = (): TableData[] => {
    try {
        if (typeof window === "undefined") return [];

        const savedData = localStorage.getItem('minesweeper_leaderboard');
        if (savedData) {
            return JSON.parse(savedData);
        } else {
            return Array.from({ length: 10 }, (_, i) => ({
                place: i + 1,
                name: `---`,
                time: `--:--`,
                timeInSeconds: 0,
                isPlaceholder: true,
            }));
        }
    } catch (e) {
        console.error('Ошибка загрузки из localStorage:', e);
        return [];
    }
}

export const savedLeaderBoard = (data: TableData[]) => {
    try {
        if (typeof window === "undefined") return [];

        localStorage.setItem('minesweeper_leaderboard', JSON.stringify(data));
    } catch (e) {
        console.error('Ошибка сохранения в localStorage:', e);
        return Array.from({ length: 10 }, (_, i) => ({
            place: i + 1,
            name: `---`,
            time: `--:--`,
            timeInSeconds: 0,
            isPlaceholder: true
        }));
    }
}