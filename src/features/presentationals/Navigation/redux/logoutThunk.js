import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const logoutAsync = createAsyncThunk('logout/status', async (url, { rejectWithValue }) => {
	try {
		const response = await axios({
			url,
			method: 'GET',
			withCredentials: true,
			headers: { 'Content-Type': 'application/json' }
		});
		return response.status;
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
});
