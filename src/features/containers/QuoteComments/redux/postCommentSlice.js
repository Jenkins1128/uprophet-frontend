import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	addedComment: {}
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
		return response.data;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const postCommentSlice = createSlice({
	name: 'postComment',
	initialState,
	reducers: {
		clearAddedComment: (state) => {
			state.addedComment = {};
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(postCommentAsync.pending, () => {})
			.addCase(postCommentAsync.fulfilled, (state, { payload }) => {
				state.addedComment = payload;
			})
			.addCase(postCommentAsync.rejected, () => {});
	}
});

export const { clearAddedComment } = postCommentSlice.actions;
export const selectAddedComment = (state) => state.postComment.addedComment;
export default postCommentSlice.reducer;
