import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginAsync = createAsyncThunk('signin/status', async (data, { rejectWithValue }) => {
	const { url, username, password } = data;
	try {
		const response = await axios({
			url,
			method: 'PUT',
			withCredentials: true,
			headers: { 'Content-Type': 'application/json' },
			data: {
				username,
				password
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
