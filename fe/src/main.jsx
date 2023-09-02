import React from "react";
import ReactDOM from "react-dom/client";
import store from "./store/store";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import router from "./router/router.jsx";

import { createTheme,ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography:{
    fontFamily:[
      'Poppins','sans-serif'
    ].join(","),
  }
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
