import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./Layout"
import Home from "./components/todo/Home";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import { AuthProvider } from "./context/AuthContext";



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
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
