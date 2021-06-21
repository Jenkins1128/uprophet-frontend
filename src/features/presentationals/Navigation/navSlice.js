import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const logoutAsync = createAsyncThunk('logout/status', async (url, { rejectWithValue }) => {
	try {
		const response = await fetch(url, {
			method: 'GET',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' }
		});
		return response.status;
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
});

const initialState = {
	status: ''
};

export const logoutSlice = createSlice({
	name: 'logout',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(logoutAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(logoutAsync.fulfilled, (state) => {
				state.status = 'success';
			})
			.addCase(logoutAsync.rejected, (state) => {
				state.status = 'rejected';
			});
	}
});

export default logoutSlice.reducer;
