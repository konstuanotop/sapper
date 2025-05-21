import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TableData } from "~/utils/storage";
import type { AppThunk } from "./store";
import axios from "axios";


interface LeaderboardState {
    generalLeaders: TableData[];
    isLoading: boolean;
    error: string | null;
};

const initialState: LeaderboardState = {
    generalLeaders: [],
    isLoading: false,
    error: null,
};

export const leaderboardSlice = createSlice({
    name: "leaderboard",
    initialState,
    reducers: {
        fetchGeneralLeadersStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        fetchGeneralLeadersSuccess(state, action: PayloadAction<TableData[]>) {
            state.generalLeaders = action.payload;
            state.isLoading = false;
        },
        fetchGeneralLeadersFailure(state, action: PayloadAction<string>) {
            state.error = action.payload;
            state.isLoading = false;
        },
    },
});

export const {
    fetchGeneralLeadersStart,
    fetchGeneralLeadersSuccess,
    fetchGeneralLeadersFailure
} = leaderboardSlice.actions;

export const fetchGeneralLeaders = (): AppThunk => async (dispatch) => {
    try {
        dispatch(fetchGeneralLeadersStart());
        const response = await axios.get<TableData[]>(
            "https://e240b9d494e24100.mokky.dev/leaders?sortBy=timeInSeconds"
        );

        const top10Leaders = response.data.slice(0, 10);

        const leadersWithCorrectPlaces = top10Leaders.map((leader, index) => ({
            ...leader,
            place: index + 1,
        }));

        while (leadersWithCorrectPlaces.length < 10) {
            leadersWithCorrectPlaces.push({
                place: leadersWithCorrectPlaces.length + 1,
                name: `---`,
                time: `--:--`,
                timeInSeconds: 0,
                isPlaceholder: true,
            });
        }

        dispatch(fetchGeneralLeadersSuccess(leadersWithCorrectPlaces));
    } catch (error) {
        dispatch(
            fetchGeneralLeadersFailure(
                error instanceof Error ? error.message : "Unknown error"
            )
        );
    }
};

export default leaderboardSlice.reducer;