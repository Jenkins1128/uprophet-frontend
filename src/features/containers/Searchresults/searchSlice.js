import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
	requestStatus: 'idle',
	results: []
};

export const searchAsync = createAsyncThunk('search/status', async (data, { rejectWithValue }) => {
	const { url, search } = data;
	try {
		const response = await fetch(url, {
			method: 'POST',
			credentials: 'include',
			headers: { Accept: '*/*', 'Content-Type': 'application/json' },
			body: JSON.stringify({
				search
			})
		});
		// The value we return becomes the `fulfilled` action payload
		return await response.json();
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(searchAsync.pending, (state) => {
				state.requestStatus = 'pending';
			})
			.addCase(searchAsync.fulfilled, (state, { payload }) => {
				state.requestStatus = 'fulfilled';
				state.results = payload;
			})
			.addCase(searchAsync.rejected, (state) => {
				state.requestStatus = 'rejected';
			});
	}
});

export const selectRequestStatus = (state) => state.search.requestStatus;
export const selectResults = (state) => state.search.results;
export default searchSlice.reducer;
