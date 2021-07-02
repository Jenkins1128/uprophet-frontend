import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
	favoriters: []
};

export const favoritersAsync = createAsyncThunk('favoriters/status', async (data, { rejectWithValue }) => {
	const { url, username } = data;
	try {
		const response = await fetch(url, {
			method: 'POST',
			credentials: 'include',
			headers: { Accept: '*/*', 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username
			})
		});
		// The value we return becomes the `fulfilled` action payload
		return await response.json();
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const favoritersSlice = createSlice({
	name: 'favoriters',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(favoritersAsync.pending, (state) => {
				state.requestStatus = 'pending';
			})
			.addCase(favoritersAsync.fulfilled, (state, { payload }) => {
				state.requestStatus = 'fulfilled';
				state.favoriters = payload;
			})
			.addCase(favoritersAsync.rejected, (state) => {
				state.requestStatus = 'rejected';
			});
	}
});

export const selectRequestStatus = (state) => state.favoriters.requestStatus;
export const selectFavoriters = (state) => state.favoriters.favoriters;
export default favoritersSlice.reducer;
