// src/App.js (react-router-dom v6)
import React from "react";
import { RouterProvider } from "react-router-dom";
import routes from "@/api/routes";
import DevToolsBlocker from "./components/DevToolsBlocker/DevToolsBlocker";

const App: React.FC = () => {
  return (
    <>
      {/* <DevToolsBlocker /> */}
      <RouterProvider router={routes} />
    </>
  );
};
export default App;
