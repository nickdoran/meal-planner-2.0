import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout.jsx";
import Spinner from "./components/Spinner.jsx";
const Planner = lazy(() => import("./pages/Planner/Planner.jsx"));
const Favorites = lazy(() => import("./pages/Favorites/Favorites.jsx"));
const Search = lazy(() => import("./pages/Search/Search.jsx"));
const MealDetails = lazy(() => import("./pages/MealDetails/MealDetails.jsx"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound.jsx"));

const Home = lazy(() => import("./pages/Home/Home.jsx"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Spinner />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/planner",
        element: (
          <Suspense fallback={<Spinner />}>
            <Planner />
          </Suspense>
        ),
      },
      {
        path: "/favorites",
        element: (
          <Suspense fallback={<Spinner />}>
            <Favorites />
          </Suspense>
        ),
      },
      {
        path: "/search",
        element: (
          <Suspense fallback={<Spinner />}>
            <Search />
          </Suspense>
        ),
      },
      {
        path: "/mealdetails/:id",
        element: (
          <Suspense fallback={<Spinner />}>
            <MealDetails />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<Spinner />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
