import { createSlice } from "@reduxjs/toolkit";

const Itemslicer = createSlice({
  name: "Itemslice",
  initialState: {
    currentLogin: (() => {
      try {
        const userData = localStorage.getItem('user');
        return userData ? JSON.parse(userData) : {};
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        localStorage.removeItem('user');
        return {};  
      }
    })(),
    currentItemInfo: sessionStorage.getItem("currenthouse") || "", 
    isUseractive: localStorage.getItem("isUseractive") === "true" || false,
  },
  reducers: {
    setvalue: (state, action) => {
      state.currentItemInfo = action.payload;
      sessionStorage.setItem("currenthouse", action.payload);  
    },
    setUseractive: (state, action) => {
      state.isUseractive = action.payload;
      localStorage.setItem("isUseractive", action.payload); 
    },
    logoutUser: (state) => {
      state.currentLogin = {}; 
      state.isUseractive = false;  
      localStorage.removeItem("user"); 
      localStorage.setItem("isUseractive", false);  
    },
    setloginuser: (state, action) => {
      state.currentLogin = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); 
    },
  },
});

export const { setvalue, setUseractive, setloginuser, logoutUser } = Itemslicer.actions;
export default Itemslicer.reducer;
