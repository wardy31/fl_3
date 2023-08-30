import { configureStore } from "@reduxjs/toolkit";
import recieptAction from "./actions/recieptAction";

export default configureStore({
    reducer:{
        reciept:recieptAction
    }
})