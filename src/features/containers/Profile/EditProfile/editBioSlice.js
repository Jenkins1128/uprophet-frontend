import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
	changeBioStatus: 'idle'
};

export const changeBioAsync = createAsyncThunk('changeBio/status', async (data, { rejectWithValue }) => {
	const { url, bio } = data;
	try {
		const response = await fetch(url, {
			method: 'POST',
			credentials: 'include',
			headers: { Accept: '*/*', 'Content-Type': 'application/json' },
			body: JSON.stringify({
				bio
			})
		});
		// The value we return becomes the `fulfilled` action payload
		return await response.json();
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const changeBioSlice = createSlice({
	name: 'changeBio',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(changeBioAsync.pending, (state) => {
				state.changeBioStatus = 'pending';
			})
			.addCase(changeBioAsync.fulfilled, (state) => {
				state.changeBioStatus = 'fulfilled';
			})
			.addCase(changeBioAsync.rejected, (state) => {
				state.changeBioStatus = 'rejected';
			});
	}
});

export const selectChangeBioStatus = (state) => state.changeBio.changeBioStatus;
export default changeBioSlice.reducer;
