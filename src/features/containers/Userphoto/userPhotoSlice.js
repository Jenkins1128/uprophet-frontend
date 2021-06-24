import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
	status: 'idle'
};

export const userPhotoAsync = createAsyncThunk('userPhoto/status', async (data, { rejectWithValue }) => {
	const { url, username } = data;
	console.log(url, username);
	try {
		const response = await fetch(url, {
			method: 'POST',
			credentials: 'include',
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username
			})
		});
		// The value we return becomes the `fulfilled` action payload
		return await response.json();
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const userPhotoSlice = createSlice({
	name: 'userPhoto',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(userPhotoAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(userPhotoAsync.fulfilled, (state) => {
				state.status = 'success';
			})
			.addCase(userPhotoAsync.rejected, (state) => {
				state.status = 'rejected';
			});
	}
});
