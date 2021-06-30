import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
	quotePost: {}
};

export const getQuotePostAsync = createAsyncThunk('getQuotePost/status', async (data, { rejectWithValue }) => {
	const { url, quoteId } = data;
	try {
		const response = await fetch(url, {
			method: 'POST',
			credentials: 'include',
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
			body: JSON.stringify({
				quoteId
			})
		});

		// The value we return becomes the `fulfilled` action payload
		return await response.json();
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
