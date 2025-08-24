import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import AllBooks from "../Pages/AllBooks/AllBooks";
import AddBook from "../Pages/AddBook/AddBook";
import BorrowedBooks from "../Pages/BorrowedBooks/BorrowedBooks";
import CategoryBooks from "../Pages/CategoryBooks/CategoryBooks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element:<Home></Home>
      },
      {
        path: "/all-books",
        element: <AllBooks></AllBooks>
      },
      {
        path: "/add-book",
        element: <AddBook></AddBook>
      },
      {
        path: "/borrowed-books",
        element: <BorrowedBooks></BorrowedBooks>
      },
      {
        path: "/login",
        element: <Login></Login>
      },

      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: "/category/:name",
        element: <CategoryBooks></CategoryBooks>
      }
    ]
  },
]);

export default router;