import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	status: 'idle',
	latestComments: []
};

export const getCommentsAsync = createAsyncThunk('getComments/status', async (data, { rejectWithValue }) => {
	const { url, quoteId } = data;
	let errorCode;
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
		return rejectWithValue([errorCode]);
	}
});

export const getCommentsSlice = createSlice({
	name: 'getComments',
	initialState,
	reducers: {
		updateQuoteComment: (state, { payload }) => {
			state.latestComments = payload;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(getCommentsAsync.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(getCommentsAsync.fulfilled, (state, { payload }) => {
				state.status = 'fulfilled';
				state.latestComments = payload;
			})
			.addCase(getCommentsAsync.rejected, (state) => {
				state.status = 'rejected';
			});
	}
});

export const { updateQuoteComment } = getCommentsSlice.actions;
export const selectLatestComments = (state) => state.comments.latestComments;
export const selectSecondRequestStatus = (state) => state.comments.status;
export default getCommentsSlice.reducer;
