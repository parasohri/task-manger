import {configureStore} from '@reduxjs/toolkit'
import userReducer from './UserSlice.jsx'
const store = configureStore({
    reducer: {
        auth: userReducer
    }
});

export default store;