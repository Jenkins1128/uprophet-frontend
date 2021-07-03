import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
	state: 'idle',
	notifications: []
};

export const getNotificationsAsync = createAsyncThunk('notifications/status', async (url, { rejectWithValue }) => {
	try {
		const response = await fetch(url, {
			method: 'GET',
			credentials: 'include',
			headers: { Accept: '*/*', 'Content-Type': 'application/json' }
		});
		// The value we return becomes the `fulfilled` action payload
		return await response.json();
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const notificationsSlice = createSlice({
	name: 'notifications',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getNotificationsAsync.pending, (state) => {
				state.requestStatus = 'pending';
			})
			.addCase(getNotificationsAsync.fulfilled, (state, { payload }) => {
				state.requestStatus = 'fulfilled';
				state.notifications = payload;
			})
			.addCase(getNotificationsAsync.rejected, (state) => {
				state.requestStatus = 'rejected';
			});
	}
});

export const selectRequestStatus = (state) => state.notifications.requestStatus;
export const selectNotifications = (state) => state.notifications.notifications;
export default notificationsSlice.reducer;
