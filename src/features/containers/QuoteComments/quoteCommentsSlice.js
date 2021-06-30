import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
	status: 'idle',
	latestComments: []
};

export const getCommentsAsync = createAsyncThunk('getComments/status', async (data, { rejectWithValue }) => {
	const { url, quoteId } = data;
	let errorCode;
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
		return rejectWithValue([errorCode]);
	}
});

export const getCommentsSlice = createSlice({
	name: 'getComments',
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(getCommentsAsync.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(getCommentsAsync.fulfilled, (state, { payload }) => {
				state.status = 'fulfilled';
				//const newQuotes = payload;
				console.log('PAYLOAD: ' + payload);
				state.latestComments = payload;
			})
			.addCase(getCommentsAsync.rejected, (state) => {
				state.status = 'rejected';
			});
	}
});

export const selectLatestComments = (state) => state.comments.latestComments;
export const selectSecondRequestStatus = (state) => state.comments.status;
export default getCommentsSlice.reducer;
