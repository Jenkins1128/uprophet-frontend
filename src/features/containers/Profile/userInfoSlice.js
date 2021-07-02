import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
	userInfo: {}
};

export const userInfoAsync = createAsyncThunk('userInfo/status', async (data, { rejectWithValue }) => {
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

export const userInfoSlice = createSlice({
	name: 'userInfo',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(userInfoAsync.pending, () => {})
			.addCase(userInfoAsync.fulfilled, (state, { payload }) => {
				state.userInfo = payload;
			})
			.addCase(userInfoAsync.rejected, () => {});
	}
});

export const selectUserInfo = (state) => state.userInfo.userInfo;
export default userInfoSlice.reducer;
