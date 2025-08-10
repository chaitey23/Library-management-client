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

const router = createBrowserRouter([
  {
    path: "/",
    Component:MainLayout,
    children: [
        {
            index:true,
            Component:Home
        },
        {
path:"/all-books",
element:AllBooks
        },
        {
          path:"/add-book",
          element:AddBook
        },
{
  path:"/borrowed-books",
  element:BorrowedBooks
},
        {
          path:"/login",
          Component:Login
        },

        {
          path:"/register",
          Component : Register
        }
    ]
  },
]);

export default router;