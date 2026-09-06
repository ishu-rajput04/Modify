import React from "react";
import "./shared/global.scss";
import { router } from "./app.routes";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./features/auth/auth.context";
import { SongProvider } from "./features/home/song.context";

const App = () => {
  return (
    <AuthProvider>
      <SongProvider>

      <RouterProvider router={router} />
      </SongProvider>
    </AuthProvider>
  );
};
export default App;
