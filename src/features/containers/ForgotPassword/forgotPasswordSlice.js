import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
	status: 'idle'
};

export const forgotPasswordAsync = createAsyncThunk('forgotPassword/status', async (data, { rejectWithValue }) => {
	const { url, username } = data;
	console.log(url, username);
	try {
		const response = await fetch(url, {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username
			})
		});

		if (response.status >= 400 && response.status < 500) {
			throw new Error('Username or password is incorrect.');
		}
		// The value we return becomes the `fulfilled` action payload
		return response.status;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const forgotPasswordSlice = createSlice({
	name: 'forgotPassword',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(forgotPasswordAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(forgotPasswordAsync.fulfilled, (state) => {
				state.status = 'success';
			})
			.addCase(forgotPasswordAsync.rejected, (state) => {
				state.status = 'rejected';
			});
	}
});
