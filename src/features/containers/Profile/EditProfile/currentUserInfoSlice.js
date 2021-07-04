import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
	requestStatus: 'idle',
	currentUserInfo: {}
};

export const getCurrentUserInfoAsync = createAsyncThunk('currentUserInfo/status', async (url, { rejectWithValue }) => {
	try {
		const response = await fetch(url, {
			method: 'GET',
			credentials: 'include',
			headers: { Accept: '*/*' }
		});
		// The value we return becomes the `fulfilled` action payload
		return await response.json();
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const currentUserInfoSlice = createSlice({
	name: 'currentUserInfo',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getCurrentUserInfoAsync.pending, (state) => {
				state.requestStatus = 'pending';
			})
			.addCase(getCurrentUserInfoAsync.fulfilled, (state, { payload }) => {
				state.requestStatus = 'fulfilled';
				state.currentUserInfo = payload;
			})
			.addCase(getCurrentUserInfoAsync.rejected, (state) => {
				state.requestStatus = 'rejected';
			});
	}
});

export const selectRequestStatus = (state) => state.currentUserInfo.requestStatus;
export const selectCurrentUserInfo = (state) => state.currentUserInfo.currentUserInfo;
export default currentUserInfoSlice.reducer;
