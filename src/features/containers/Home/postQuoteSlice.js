import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	newQuote: {}
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
		return response.data;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const postQuoteSlice = createSlice({
	name: 'postQuote',
	initialState,
	reducers: {
		clearAddedQuote: (state, { payload }) => {
			state.newQuote = {};
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(postQuoteAsync.pending, () => {})
			.addCase(postQuoteAsync.fulfilled, (state, { payload }) => {
				state.newQuote = payload;
			})
			.addCase(postQuoteAsync.rejected, () => {});
	}
});

export const { clearAddedQuote } = postQuoteSlice.actions;
export const selectNewQuote = (state) => state.postQuote.newQuote;
export default postQuoteSlice.reducer;
