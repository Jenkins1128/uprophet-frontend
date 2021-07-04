import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
	changePhotoStatus: 'idle'
};

export const changePhotoAsync = createAsyncThunk('changePhoto/status', async (data, { rejectWithValue }) => {
	const { url, imageData } = data;
	const { name, image } = imageData;
	console.log('imageData', imageData);
	try {
		const response = await fetch(url, {
			method: 'POST',
			credentials: 'include',
			headers: { Accept: '*/*', 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name,
				image
			})
		});
		// The value we return becomes the `fulfilled` action payload
		return response.status;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const changePhotoSlice = createSlice({
	name: 'changePhoto',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(changePhotoAsync.pending, (state) => {
				state.changePhotoStatus = 'pending';
			})
			.addCase(changePhotoAsync.fulfilled, (state) => {
				state.changePhotoStatus = 'fulfilled';
			})
			.addCase(changePhotoAsync.rejected, (state) => {
				state.changePhotoStatus = 'rejected';
			});
	}
});

export const selectChangePhotoStatus = (state) => state.changePhoto.changePhotoStatus;
export default changePhotoSlice.reducer;
