import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	addedQuote: {}
};

export const postCommentAsync = createAsyncThunk('postComment/status', async (data, { rejectWithValue }) => {
	const { url, quoteId, comment } = data;

	try {
		const response = await axios({
			url,
			method: 'POST',
			withCredentials: true,
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
			data: {
				quoteId,
				comment
			}
		});

		// The value we return becomes the `fulfilled` action payload
		return response.data;
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
				state.addedQuote = payload;
			})
			.addCase(postCommentAsync.rejected, () => {});
	}
});

export const selectAddedComment = (state) => state.postComment.addedQuote;
export default postCommentSlice.reducer;
