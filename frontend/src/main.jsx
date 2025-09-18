import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

import ShopContextProvider from "./context/ShopContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ShopContextProvider>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <App />
      </GoogleOAuthProvider>
    </ShopContextProvider>
  </BrowserRouter>
);
