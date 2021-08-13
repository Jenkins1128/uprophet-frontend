import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const deleteQuoteAsync = createAsyncThunk('deleteQuote/status', async (data, { rejectWithValue }) => {
	const { url, quoteId } = data;
	try {
		const response = await axios({
			url,
			method: 'DELETE',
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
