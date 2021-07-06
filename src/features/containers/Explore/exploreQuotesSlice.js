import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	exploreQuotes: []
};

export const getExploreQuotesAsync = createAsyncThunk('exploreQuotes/status', async (url, { rejectWithValue }) => {
	try {
		const response = await axios({
			url,
			method: 'GET',
			withCredentials: true,
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
		});
		// The value we return becomes the `fulfilled` action payload

		return response.data;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const exploreQuotesSlice = createSlice({
	name: 'exploreQuotes',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getExploreQuotesAsync.pending, () => {})
			.addCase(getExploreQuotesAsync.fulfilled, (state, { payload }) => {
				console.log('exploreQuotes', payload);
				state.exploreQuotes = payload;
			})
			.addCase(getExploreQuotesAsync.rejected, () => {});
	}
});

export const selectExploreQuotes = (state) => state.exploreQuotes.exploreQuotes;
export default exploreQuotesSlice.reducer;
