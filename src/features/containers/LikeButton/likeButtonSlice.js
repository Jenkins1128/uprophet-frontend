import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const likeAsync = createAsyncThunk('like/status', async (data, { rejectWithValue }) => {
	const { url, quoteId } = data;
	console.log(url, quoteId);
	try {
		const response = await fetch(url, {
			method: 'POST',
			credentials: 'include',
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
			body: JSON.stringify({
				quoteId
			})
		});
		// The value we return becomes the `fulfilled` action payload
		return await response.status;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const likeSlice = createSlice({
	name: 'like',
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(likeAsync.pending, () => {})
			.addCase(likeAsync.fulfilled, () => {})
			.addCase(likeAsync.rejected, () => {});
	}
});

export const unlikeAsync = createAsyncThunk('unlike/status', async (data, { rejectWithValue }) => {
	const { url, quoteId } = data;
	console.log(url, quoteId);
	try {
		const response = await fetch(url, {
			method: 'POST',
			credentials: 'include',
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
			body: JSON.stringify({
				quoteId
			})
		});
		// The value we return becomes the `fulfilled` action payload
		return response.status;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const unlikeSlice = createSlice({
	name: 'unlike',
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(unlikeAsync.pending, () => {})
			.addCase(unlikeAsync.fulfilled, () => {})
			.addCase(unlikeAsync.rejected, () => {});
	}
});
