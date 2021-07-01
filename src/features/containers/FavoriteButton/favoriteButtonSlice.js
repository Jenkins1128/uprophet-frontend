import { createAsyncThunk } from '@reduxjs/toolkit';

export const favoriteAsync = createAsyncThunk('favorite/status', async (data, { rejectWithValue }) => {
	const { url, toUser } = data;
	console.log(url, toUser);
	try {
		const response = await fetch(url, {
			method: 'POST',
			credentials: 'include',
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
			body: JSON.stringify({
				toUser
			})
		});

		if (response.status >= 400 && response.status < 500) {
			throw new Error('400');
		}
		// The value we return becomes the `fulfilled` action payload
		return await response.status;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

// export const likeSlice = createSlice({
// 	name: 'like',
// 	reducers: {},
// 	extraReducers: (builder) => {
// 		builder
// 			.addCase(likeAsync.pending, () => {})
// 			.addCase(likeAsync.fulfilled, () => {})
// 			.addCase(likeAsync.rejected, () => {});
// 	}
// });

export const unfavoriteAsync = createAsyncThunk('unfavorite/status', async (data, { rejectWithValue }) => {
	const { url, toUser } = data;
	console.log(url, toUser);
	try {
		const response = await fetch(url, {
			method: 'POST',
			credentials: 'include',
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
			body: JSON.stringify({
				toUser
			})
		});
		// The value we return becomes the `fulfilled` action payload
		return response.status;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

// export const unlikeSlice = createSlice({
// 	name: 'unlike',
// 	reducers: {},
// 	extraReducers: (builder) => {
// 		builder
// 			.addCase(unlikeAsync.pending, () => {})
// 			.addCase(unlikeAsync.fulfilled, () => {})
// 			.addCase(unlikeAsync.rejected, () => {});
// 	}
// });
