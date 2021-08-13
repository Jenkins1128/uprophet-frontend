import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	profileQuotes: []
};

export const profileAsync = createAsyncThunk('profile/status', async (data, { rejectWithValue }) => {
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

export const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(profileAsync.pending, (state) => {
				state.requestStatus = 'pending';
			})
			.addCase(profileAsync.fulfilled, (state, { payload }) => {
				state.requestStatus = 'fulfilled';
				state.profileQuotes = payload;
			})
			.addCase(profileAsync.rejected, (state) => {
				state.requestStatus = 'rejected';
			});
	}
});

export const selectRequestStatus = (state) => state.profile.requestStatus;
export const selectProfileQuotes = (state) => state.profile.profileQuotes;
export default profileSlice.reducer;
