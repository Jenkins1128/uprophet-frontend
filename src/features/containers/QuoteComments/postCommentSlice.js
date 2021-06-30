import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
	addedQuote: {}
};

export const postCommentAsync = createAsyncThunk('postComment/status', async (data, { rejectWithValue }) => {
	const { url, quoteId, comment } = data;
	console.log(quoteId, comment);
	try {
		const response = await fetch(url, {
			method: 'POST',
			credentials: 'include',
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
			body: JSON.stringify({
				quoteId,
				comment
			})
		});

		// The value we return becomes the `fulfilled` action payload
		return await response.json();
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const postCommentSlice = createSlice({
	name: 'postComment',
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(postCommentAsync.pending, () => {})
			.addCase(postCommentAsync.fulfilled, (state, { payload }) => {
				console.log('postComment p: ', payload);
				//add new quote
				state.addedQuote = payload;
			})
			.addCase(postCommentAsync.rejected, () => {});
	}
});

export const selectAddedComment = (state) => state.postComment.addedQuote;
export default postCommentSlice.reducer;
