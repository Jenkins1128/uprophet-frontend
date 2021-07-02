import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
	favoriting: []
};

export const favoritingAsync = createAsyncThunk('favoriting/status', async (data, { rejectWithValue }) => {
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

export const favoritingSlice = createSlice({
	name: 'favoriting',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(favoritingAsync.pending, (state) => {
				state.requestStatus = 'pending';
			})
			.addCase(favoritingAsync.fulfilled, (state, { payload }) => {
				state.requestStatus = 'fulfilled';
				state.favoriting = payload;
			})
			.addCase(favoritingAsync.rejected, (state) => {
				state.requestStatus = 'rejected';
			});
	}
});

export const selectRequestStatus = (state) => state.favoriting.requestStatus;
export const selectFavoriting = (state) => state.favoriting.favoriting;
export default favoritingSlice.reducer;
