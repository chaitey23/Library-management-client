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
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import BookDetails from "../Pages/BookDetails/BookDetails";
import UpdateBook from "../Pages/UpdateBook/UpdateBook";
import NotFound from "../Pages/Notfound/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      {
        path: "/all-books",
        element: <PrivateRoute>
          <AllBooks></AllBooks>
        </PrivateRoute>
      },
      {
        path: "/add-book",
        element: <PrivateRoute>
          <AddBook></AddBook>
        </PrivateRoute>
      },
      {
        path: "/borrowed-books",
        element: <PrivateRoute>
          <BorrowedBooks></BorrowedBooks>
        </PrivateRoute>
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
      },
      {
        path: "/book/:id",
        element: <PrivateRoute>
          <BookDetails></BookDetails>
        </PrivateRoute>
      },
      {
        path: "/update-book/:id",
        element: <PrivateRoute>
          <UpdateBook></UpdateBook>
        </PrivateRoute>
      },

    ]
  },
  {
    path: "*",
    element: <NotFound></NotFound>
  }
]);

export default router;