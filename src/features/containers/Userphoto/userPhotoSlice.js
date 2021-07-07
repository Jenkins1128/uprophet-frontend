import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	status: 'idle'
};

export const userPhotoAsync = createAsyncThunk('userPhoto/status', async (data, { rejectWithValue }) => {
	const { url, username } = data;
	try {
		const response = await axios({
			url,
			method: 'POST',
			withCredentials: true,
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
			data: {
				username
			}
		});
		return response.data;
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
