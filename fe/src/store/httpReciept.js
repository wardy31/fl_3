import { loading, getData } from "./actions/recieptAction";
import axios from "axios";
import store from "../store/store"
axios.defaults.baseURL = "http://localhost:4000/api/";

export const getReciept = () => async (dispatch, getState) => {
  console.log("loawd");
  dispatch(loading({ type: "get", data: true }))
  try {
    const { data } = await axios.get("get");
    dispatch(loading({ type: "get", data: false }));
    console.log(data);
    dispatch(getData({ type: "get", data: data }));
  } catch (error) {
    dispatch(loading({ type: "get", data: false }));
    console.log(error);
  }
};

export const deleteReciept = (id) => async (dispatch, getState) => {
  dispatch(loading({ type: "delete", data: true }));

  try {
    const { data } = await axios.delete(`delete/${id}`);
    await dispatch(loading({ type: "delete", data: false }));
    await store.dispatch(getReciept());
    console.log(data);
    return true
  } catch (error) {
    dispatch(loading({ type: "delete", data: false }));
    console.log(error);
    return false
  }

};
export const addReciept = (form) => async (dispatch, getState) => {
  dispatch(loading({ type: "post", data: true }));
console.log(form);
  try {
    const { data } = await axios.post(`create`,form);
    await dispatch(loading({ type: "post", data: false }));
    await store.dispatch(getReciept());
    console.log(data);
    return true
  } catch (error) {
    dispatch(loading({ type: "post", data: false }));
    console.log(error);
    return false
  }
};
