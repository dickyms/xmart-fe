import { configureStore } from '@reduxjs/toolkit'
import authReducer from './state/createSlice';

export default configureStore({
    reducer: {
        auth: authReducer
    }
})