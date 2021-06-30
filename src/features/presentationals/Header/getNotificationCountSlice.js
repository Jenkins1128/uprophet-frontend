import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
	notificationCount: 0
};

export const getNotificationCountAsync = createAsyncThunk('getNotificationCount/status', async (url, { rejectWithValue }) => {
	try {
		const response = await fetch(url, {
			method: 'GET',
			credentials: 'include',
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
		});
		// The value we return becomes the `fulfilled` action payload

		return await response.json();
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const getNotificationCountSlice = createSlice({
	name: 'getNotificationCount',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getNotificationCountAsync.pending, () => {})
			.addCase(getNotificationCountAsync.fulfilled, (state, { payload }) => {
				state.notificationCount = payload.notificationCount;
			})
			.addCase(getNotificationCountAsync.rejected, () => {});
	}
});

export const selectNotificationCount = (state) => state.notificationCount.notificationCount;
export default getNotificationCountSlice.reducer;
