import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
	status: 'idle',
	latestQuotes: [],
	notificationCount: 0
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
		updateLatestQuotes: (state, { payload }) => {
			state.latestQuotes = [...state.latestQuotes, payload];
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(homeAsync.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(homeAsync.fulfilled, (state, { payload }) => {
				state.status = 'fulfilled';
				console.log('PAYLOAD: ' + payload);
				const newQuotes = payload;
				const notifications = newQuotes.pop().notificationCount;
				state.latestQuotes = newQuotes.reverse();
				state.notificationCount = notifications;
			})
			.addCase(homeAsync.rejected, (state) => {
				state.status = 'rejected';
			});
	}
});

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
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(postQuoteAsync.pending, () => {})
			.addCase(postQuoteAsync.fulfilled, (state, { payload }) => {
				//delete your current quote from latestQutoes arr if exists
				const latestQuotes = state.latestQuotes.some((quote, i) => {
					if (quote.user_name === payload.user_name) {
						latestQuotes.splice(i, i, payload);
					}
					return quote.user_name === payload.user_name;
				});
				//add new quote
				state.latestQuotes = [...latestQuotes];
			})
			.addCase(postQuoteAsync.rejected, () => {});
	}
});

export const getUserAsync = createAsyncThunk('getUser/status', async (url, { rejectWithValue }) => {
	try {
		const response = await fetch(url, {
			method: 'GET',
			credentials: 'include',
			headers: { Accept: '*/*' }
		});
		// The value we return becomes the `fulfilled` action payload
		return response.status;
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
			.addCase(getUserAsync.pending, () => {})
			.addCase(getUserAsync.fulfilled, () => {})
			.addCase(getUserAsync.rejected, () => {});
	}
});

export const selectLatestQuotes = (state) => state.home.latestQuotes;
export const selectNotificationCount = (state) => state.home.notificationCount;
export const selectSecondRequestStatus = (state) => state.home.status;

export const { updateLatestQuotes } = homeSlice.actions;

export default homeSlice.reducer;
