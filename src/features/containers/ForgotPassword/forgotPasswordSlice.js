import { createAsyncThunk } from '@reduxjs/toolkit';

export const forgotPasswordAsync = createAsyncThunk('forgotPassword/status', async (data, { rejectWithValue }) => {
	const { url, username, email } = data;
	console.log(url, username, email);
	try {
		const response = await fetch(url, {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username,
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
