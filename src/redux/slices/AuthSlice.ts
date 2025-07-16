import { createSlice } from "@reduxjs/toolkit"

interface AuthState  {
    isLoggedIn : boolean,
    userData : {
        [key: string] : any
    } | null
}


const initialState : AuthState = {
    isLoggedIn : false,
    userData: null
}

const AuthSlice = createSlice({
  name:  "AuthSlice",
  initialState,
  reducers:{
    updateLogin : (state,action) => {
      
        state.isLoggedIn = action.payload.isLoggedIn
        state.userData = action.payload.userData
    }
  }
})


export const {updateLogin} = AuthSlice.actions
export default AuthSlice.reducer