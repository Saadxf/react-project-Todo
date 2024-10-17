import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./Layout"
import Home from "./Home";
import SignIn from "./SignIn";
import SignUp from "./SignUp";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "SignIn",
        element: <SignIn />,
      },
      {
        path: "SignUp",
        element: <SignUp />,
      },
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
