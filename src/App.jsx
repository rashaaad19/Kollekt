import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Favourites from './pages/Favourites';
import Bookmarks from "./pages/Bookmarks";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Signup />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path:"/home",
          element:<Home/>
        },
        {
          path:'/favourites',
          element:<Favourites/>
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path:'/bookmarks',
          element:<Bookmarks/>
        }
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
