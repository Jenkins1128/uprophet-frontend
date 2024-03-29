import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	requestStatus: 'idle',
	results: []
};

export const searchAsync = createAsyncThunk('search/status', async (data, { rejectWithValue }) => {
	const { url, search } = data;
	try {
		const response = await axios({
			url,
			method: 'POST',
			withCredentials: true,
			headers: { Accept: '*/*', 'Content-Type': 'application/json' },
			data: {
				search
			}
		});
		return response.data;
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
