// src/routes.tsx
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "@/pages/Main/Main";
import Test from "@/pages/Test";
import ProjectTest from "@/pages/ProjectTest/ProjectTest";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/test", // /test 경로로 이동
    element: <Test />, // Test 페이지 컴포넌트 연결
  },
  {
    path: "/project", // /test 경로로 이동
    element: <ProjectTest />, // Test 페이지 컴포넌트 연결
  },
]);

export default routes;
