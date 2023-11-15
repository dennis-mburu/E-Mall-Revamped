import { createSlice } from "@reduxjs/toolkit";

// This initialState is defined in a slightly different way compared to that
// of the cartSlice, but they both work, since both ways will initialze state
// as an immutable object (as it should be). Both will have one key value pair. 
// i.e, userInfo: null and cartItems: []. 
const initialState = {userInfo : localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action){
      console.log("Payload: ",action.payload)
       state.userInfo = action.payload;
       localStorage.setItem("userInfo", JSON.stringify(action.payload))
    }
  },
});


export const {setCredentials} = authSlice.actions
export default authSlice.reducer
