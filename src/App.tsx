// src/App.js (react-router-dom v6)
import React from "react";
import { RouterProvider } from "react-router-dom";
import routes from "@/api/routes";

const App: React.FC = () => {
  return (
    <>
      {/* <DevToolsBlocker /> */}
      <RouterProvider router={routes} />
    </>
  );
};
export default App;
