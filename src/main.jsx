import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Spinner from "./components/Spinner.jsx";
import Layout from "./components/Layout.jsx";

// Create lazy components
const Planner = lazy(() => import("./pages/Planner/Planner.jsx"));
const Favorites = lazy(() => import("./pages/Favorites/Favorites.jsx"));
const Search = lazy(() => import("./pages/Search/Search.jsx"));
const MealDetails = lazy(() => import("./pages/MealDetails/MealDetails.jsx"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
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

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
