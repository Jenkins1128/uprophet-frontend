import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const favoriteAsync = createAsyncThunk('favorite/status', async (data, { rejectWithValue }) => {
	const { url, toUser } = data;
	try {
		const response = await axios({
			url,
			method: 'POST',
			withCredentials: true,
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
			data: {
				toUser
			}
		});

		if (response.status >= 400 && response.status < 500) {
			throw new Error('400');
		}
		// The value we return becomes the `fulfilled` action payload
		return response.status;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const unfavoriteAsync = createAsyncThunk('unfavorite/status', async (data, { rejectWithValue }) => {
	const { url, toUser } = data;
	try {
		const response = await axios({
			url,
			method: 'POST',
			withCredentials: true,
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
			data: {
				toUser
			}
		});
		// The value we return becomes the `fulfilled` action payload
		return response.status;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});
