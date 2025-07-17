import { configureStore } from "@reduxjs/toolkit";
import AuthApi from "./apis/AuthApi"
import AuthReducer from "./slices/AuthSlice"
import ChatReducer from "./slices/ChatSlice"

const store = configureStore({
    reducer: {
        [AuthApi.reducerPath] : AuthApi.reducer,
        auth : AuthReducer,
        chat : ChatReducer
        
    },
    middleware : (defaultmiddleware) => 
        defaultmiddleware().concat(AuthApi.middleware)
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store