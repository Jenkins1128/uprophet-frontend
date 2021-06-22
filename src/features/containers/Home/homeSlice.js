import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
	status: 'idle'
};

export const homeAsync = createAsyncThunk('home/status', async (url, { rejectWithValue }) => {
	let errorCode;
	try {
		const response = await fetch(url, {
			method: 'GET',
			credentials: 'include',
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
		});

		if (response.status > 400 && response.status < 500) {
			errorCode = response.status;
		}

		// The value we return becomes the `fulfilled` action payload
		return await response.json();
	} catch (err) {
		return rejectWithValue([errorCode]);
	}
});

export const homeSlice = createSlice({
	name: 'home',
	initialState,
	reducers: {
	},
	extraReducers: (builder) => {
		builder
			.addCase(homeAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(homeAsync.fulfilled, (state) => {
				state.status = 'success';
			})
			.addCase(homeAsync.rejected, (state) => {
				state.status = 'rejected';
			});
	}
});

const initialState2 = {
	status: 'idle'
};

export const postQuoteAsync = createAsyncThunk('postQuote/status', async (data, { rejectWithValue }) => {
	const { url, title, quote } = data;
	console.log(url, title, quote);
	try {
		const response = await fetch(url, {
			method: 'POST',
			credentials: 'include',
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
			body: JSON.stringify({
				title,
				quote
			})
		});

		// The value we return becomes the `fulfilled` action payload
		return await response.json();
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const postQuoteSlice = createSlice({
	name: 'postQuote',
	initialState2,
	reducers: {
	},
	extraReducers: (builder) => {
		builder
			.addCase(postQuoteAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(postQuoteAsync.fulfilled, (state) => {
				state.status = 'success';
			})
			.addCase(postQuoteAsync.rejected, (state) => {
				state.status = 'rejected';
			});
	}
});

export default homeSlice.reducer;
