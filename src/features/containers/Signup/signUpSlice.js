import { createAsyncThunk } from '@reduxjs/toolkit';

export const signUpAsync = createAsyncThunk('signUpAsync/status', async (data, { rejectWithValue }) => {
	const { url, name, username, password, email } = data;
	console.log(url, name, username, password, email);
	try {
		const response = await fetch(url, {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name,
				username,
				password,
				email
			})
		});
		if (response.status >= 400 && response.status < 500) {
			throw new Error(response.status);
		}
		// The value we return becomes the `fulfilled` action payload
		return response.status;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});
