import { createBrowserRouter,useParams } from "react-router-dom";

import App from "../App";
import Home from "../components/Home";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
    },
    {
      path: "/:id",
      element: <Home/>,
      children:[
        {
          path:"",
          element: <div>childresn</div>
        }
      ]
    },
    {
      path:'*',
      element: <div>Ereror</div>
    }
  ]);


export default router