import Logpage from "./Components/layout/LogPage/Logpage";
import Homepage from "./Components/layout/Main/Homepage/Homepage";
import Withdraw from "./Components/layout/Main/Withdraw/Withdraw";
import Deposit from "./Components/layout/Main/Deposit/Deposit";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./Components/layout/404/Error";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Logpage/>,
    },
    {
      path: "/home",
      element: <Homepage/>
    },
    {
      path: "/deposit",
      element: <Deposit/>
    },
    {
      path: "/withdrawal",
      element: <Withdraw/>
    },
    {
      path: "/*",
      element: <Error/>
    }  
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}