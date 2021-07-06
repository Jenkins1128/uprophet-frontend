import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	latestQuotes: []
};

export const postQuoteAsync = createAsyncThunk('postQuote/status', async (data, { rejectWithValue }) => {
	const { url, title, quote } = data;
	try {
		const response = await axios({
			url,
			method: 'POST',
			withCredentials: true,
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
			data: {
				title,
				quote
			}
		});

		// The value we return becomes the `fulfilled` action payload
		return response.data;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const postQuoteSlice = createSlice({
	name: 'postQuote',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(postQuoteAsync.pending, () => {})
			.addCase(postQuoteAsync.fulfilled, (state, { payload }) => {
				//delete your current quote from latestQutoes arr if exists
				const latestQuotes = state.latestQuotes.some((quote, i) => {
					if (quote.user_name === payload.user_name) {
						latestQuotes.splice(i, i, payload);
					}
					return quote.user_name === payload.user_name;
				});
				//add new quote
				state.latestQuotes = [...latestQuotes];
			})
			.addCase(postQuoteAsync.rejected, () => {});
	}
});

export const selectAddedLatestQuotes = (state) => state.postQuote.latestQuotes;
export default postQuoteSlice.reducer;
