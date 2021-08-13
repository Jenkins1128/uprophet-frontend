import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	favoriters: []
};

export const favoritersAsync = createAsyncThunk('favoriters/status', async (data, { rejectWithValue }) => {
	const { url, username } = data;
	try {
		const response = await axios({
			url,
			method: 'POST',
			withCredentials: true,
			headers: { Accept: '*/*', 'Content-Type': 'application/json' },
			data: {
				username
			}
		});
		return response.data;
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
