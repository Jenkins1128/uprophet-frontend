import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const likeAsync = createAsyncThunk('like/status', async (data, { rejectWithValue }) => {
	const { url, quoteId } = data;
	try {
		const response = await axios({
			url,
			method: 'POST',
			withCredentials: true,
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
			data: {
				quoteId
			}
		});
		return response.status;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const unlikeAsync = createAsyncThunk('unlike/status', async (data, { rejectWithValue }) => {
	const { url, quoteId } = data;
	try {
		const response = await axios({
			url,
			method: 'POST',
			withCredentials: true,
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
			data: {
				quoteId
			}
		});
		return response.status;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});
