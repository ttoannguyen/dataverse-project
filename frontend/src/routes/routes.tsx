import type { RouteObject } from "react-router-dom";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Layout from "@/pages/Layout";
import About from "@/pages/About";
import Topic from "@/pages/Topic";
import Blog from "@/pages/Blog";
import Dataverse from "@/pages/Dataverse";
import Dataverse_test from "@/pages/Dataverse_test";
import Dataset from "@/pages/Dataset";
import Haha from "@/pages/Haha";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/dataverse",
        element: <Dataverse />,
      },
      {
        path: "/topics",
        element: <Topic />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/dataset",
        element: <Dataset />,
      },
    ],
  },
];
