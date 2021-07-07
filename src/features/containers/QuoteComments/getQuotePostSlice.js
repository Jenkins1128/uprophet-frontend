import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	quotePost: {}
};

export const getQuotePostAsync = createAsyncThunk('getQuotePost/status', async (data, { rejectWithValue }) => {
	const { url, quoteId } = data;
	try {
		const response = await axios({
			url,
			method: 'POST',
			withCredentials: true,
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
			data: {
				quoteId
			}
		});
		return response.data;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const getQuotePostSlice = createSlice({
	name: 'getQuotePost',
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(getQuotePostAsync.pending, () => {})
			.addCase(getQuotePostAsync.fulfilled, (state, { payload }) => {
				state.quotePost = payload;
			})
			.addCase(getQuotePostAsync.rejected, () => {});
	}
});

export const selectQuotePost = (state) => state.quotePost.quotePost;
export default getQuotePostSlice.reducer;
