import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
	res: 500,
	status: 'idle'
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const homeAsync = createAsyncThunk('home/status', async (url, { rejectWithValue }) => {
	try {
		const response = await fetch(url, {
			method: 'GET',
			credentials: 'include',
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
		});
		// The value we return becomes the `fulfilled` action payload
		return response.data;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const homeSlice = createSlice({
	name: 'home',
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		//isStillSignedIn: (state, { payload }) => {
		// Redux Toolkit allows us to write "mutating" logic in reducers. It
		// doesn't actually mutate the state because it uses the Immer library,
		// which detects changes to a "draft state" and produces a brand new
		// immutable state based off those changes
		//state.isSignedIn = payload;
		//}
	},
	// The `extraReducers` field lets the slice handle actions defined elsewhere,
	// including actions generated by createAsyncThunk or in other slices.
	extraReducers: (builder) => {
		builder
			.addCase(homeAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(homeAsync.fulfilled, (state) => {
				state.status = 'success';
				state.res = 200;
			})
			.addCase(homeAsync.rejected, (state) => {
				state.status = 'rejected';
			});
	}
});

//export const {  } = homeSlice.actions;

// The function below is called a selector and allows us to select a isSignedIn from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.isSignedIn)`
export const selectResCodeState = (state) => state.home.resCode;

export default homeSlice.reducer;
