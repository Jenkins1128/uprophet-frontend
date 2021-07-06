import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const forgotPasswordAsync = createAsyncThunk('forgotPassword/status', async (data, { rejectWithValue }) => {
	const { url, username, email } = data;
	try {
		const response = await axios({
			url,
			method: 'POST',
			withCredentials: true,
			headers: { 'Content-Type': 'application/json' },
			data: {
				username,
				email
			}
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
