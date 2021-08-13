import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const signUpAsync = createAsyncThunk('signUpAsync/status', async (data, { rejectWithValue }) => {
	const { url, name, username, password, email } = data;
	try {
		const response = await axios({
			url,
			method: 'POST',
			withCredentials: true,
			headers: { 'Content-Type': 'application/json' },
			data: {
				name,
				username,
				password,
				email
			}
		});
		if (response.status >= 400 && response.status < 500) {
			throw new Error(response.status);
		}
		return response.status;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});
