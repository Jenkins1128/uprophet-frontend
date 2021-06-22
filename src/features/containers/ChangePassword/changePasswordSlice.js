import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
	status: 'idle'
};

export const changePasswordAsync = createAsyncThunk('changePassword/status', async (data, { rejectWithValue }) => {
	const { url, username, newPassword } = data;
	console.log(url, username, newPassword);
	try {
		const response = await fetch(url, {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username,
				password: newPassword
			})
		});
		console.log(response.status);
		// The value we return becomes the `fulfilled` action payload
		return response.status;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const changePasswordSlice = createSlice({
	name: 'changePassword',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(changePasswordAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(changePasswordAsync.fulfilled, (state) => {
				state.status = 'success';
			})
			.addCase(changePasswordAsync.rejected, (state) => {
				state.status = 'rejected';
			});
	}
});

export const changePasswordSignInAsync = createAsyncThunk('changePasswordSignIn/status', async (data, { rejectWithValue }) => {
	const { url, username, password } = data;
	console.log(url, username, password);
	try {
		const response = await fetch(url, {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username,
				password
			})
		});
		if (response.status === 401) {
			throw new Error('Username or password is incorrect.');
		}
		// The value we return becomes the `fulfilled` action payload
		return response.status;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const changePasswordSignInSlice = createSlice({
	name: 'changePasswordSignIn',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(changePasswordSignInAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(changePasswordSignInAsync.fulfilled, (state) => {
				state.status = 'success';
			})
			.addCase(changePasswordSignInAsync.rejected, (state) => {
				state.status = 'rejected';
			});
	}
});

//export default changePasswordSlice.reducer;
