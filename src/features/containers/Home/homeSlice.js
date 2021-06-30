import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
	latestQuotes: [],
	requestStatus: 'idle'
};

export const homeAsync = createAsyncThunk('home/status', async (url, { rejectWithValue }) => {
	let errorCode;
	try {
		const response = await fetch(url, {
			method: 'GET',
			credentials: 'include',
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
		});

		if (response.status > 400 && response.status < 500) {
			errorCode = response.status;
		}

		// The value we return becomes the `fulfilled` action payload
		return await response.json();
	} catch (err) {
		return rejectWithValue([errorCode]);
	}
});

export const homeSlice = createSlice({
	name: 'home',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(homeAsync.pending, (state) => {
				state.requestStatus = 'pending';
			})
			.addCase(homeAsync.fulfilled, (state, { payload }) => {
				state.latestQuotes = payload.reverse();
				state.requestStatus = 'fulfilled';
			})
			.addCase(homeAsync.rejected, (state) => {
				state.requestStatus = 'rejected';
			});
	}
});

export const selectLatestQuotes = (state) => state.home.latestQuotes;
export const selectSecondRequestStatus = (state) => state.home.requestStatus;

export default homeSlice.reducer;
