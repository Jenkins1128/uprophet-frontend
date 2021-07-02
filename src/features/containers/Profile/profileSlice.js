import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
	profileQuotes: []
};

export const profileAsync = createAsyncThunk('profile/status', async (data, { rejectWithValue }) => {
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
