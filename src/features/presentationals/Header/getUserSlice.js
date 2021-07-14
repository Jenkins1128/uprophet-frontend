import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	requestStatus: 'idle',
	currentUser: ''
};

export const getUserAsync = createAsyncThunk('getUser/status', async (url, { rejectWithValue }) => {
	try {
		const response = await axios({
			url,
			method: 'GET',
			withCredentials: true,
			headers: { Accept: '*/*' },
			proxy: {
				host: 'localhost',
				port: 3001
			}
		});
		return response.data;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const getUserSlice = createSlice({
	name: 'getUser',
	initialState,
	reducers: {
		clearCurrentUser: (state) => {
			state.currentUser = '';
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUserAsync.pending, (state) => {
				state.requestStatus = 'pending';
			})
			.addCase(getUserAsync.fulfilled, (state, { payload }) => {
				state.requestStatus = 'fulfilled';
				state.currentUser = payload;
			})
			.addCase(getUserAsync.rejected, (state) => {
				state.requestStatus = 'rejected';
				state.currentUser = '';
			});
	}
});

export const { clearCurrentUser } = getUserSlice.actions;
export const selectFirstRequestStatus = (state) => state.getUser.requestStatus;
export const selectCurrentUser = (state) => state.getUser.currentUser;
export default getUserSlice.reducer;
