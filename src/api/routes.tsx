// src/routes.tsx
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "@/pages/Main/Main";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
]);

export default routes;
