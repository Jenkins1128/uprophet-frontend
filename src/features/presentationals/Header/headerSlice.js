import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
	status: 'idle'
};

export const getUserAsync = createAsyncThunk('getUser/status', async (url, { rejectWithValue }) => {
	try {
		const response = await fetch(url, {
			method: 'GET',
			credentials: 'include',
			headers: { Accept: '*/*' }
		});
		// The value we return becomes the `fulfilled` action payload
		return await response.json();
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const getUserSlice = createSlice({
	name: 'getUser',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getUserAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getUserAsync.fulfilled, (state) => {
				state.status = 'success';
			})
			.addCase(getUserAsync.rejected, (state) => {
				state.status = 'rejected';
			});
	}
});
