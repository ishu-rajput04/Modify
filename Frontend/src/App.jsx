import React from "react";
import "./shared/global.scss";
import { router } from "./app.routes";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./features/auth/auth.context";
const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
