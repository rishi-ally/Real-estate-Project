import { configureStore } from "@reduxjs/toolkit";
import itemslicer from './index'
const store=configureStore({

reducer:{
  Itemslice:itemslicer
}


})
export default store;