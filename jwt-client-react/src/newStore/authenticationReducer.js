import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = { loggedIn: false }

export const authenticationReducer = createSlice({
    name: 'authentication',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        addAuth: (state, action) => { return { ...state, user: action.payload.user, token: action.payload.token, loggedIn: true } },
        addToken: (state, action) => { return { ...state, token: action.payload.token } },
        removeAuth: (state) => {
            let ns = { ...state, loggedIn: false }
            delete ns['user']
            delete ns['token']
            return ns
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        },
    },
});

export const { addAuth, addToken, removeAuth } = authenticationReducer.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAuthentication = (state) => state.authentication.value;



export default authenticationReducer.reducer;
