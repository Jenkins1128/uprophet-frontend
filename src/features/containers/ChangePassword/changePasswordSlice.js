import { createAsyncThunk } from '@reduxjs/toolkit';

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
			throw new Error(response.status);
		}
		// The value we return becomes the `fulfilled` action payload
		return response.status;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});
