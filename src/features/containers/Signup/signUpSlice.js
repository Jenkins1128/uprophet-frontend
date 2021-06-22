import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
	status: 'idle'
};

export const signUpAsync = createAsyncThunk('signUpAsync/status', async (data, { rejectWithValue }) => {
	const { url, name, username, password, email } = data;
	console.log(url, name, username, password, email);
	try {
		const response = await fetch(url, {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name,
				username,
				password,
				email
			})
		});
		// The value we return becomes the `fulfilled` action payload
		return response.status;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const signUpSlice = createSlice({
	name: 'signUp',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(signUpAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(signUpAsync.fulfilled, (state) => {
				state.status = 'success';
			})
			.addCase(signUpAsync.rejected, (state) => {
				state.status = 'rejected';
			});
	}
});
