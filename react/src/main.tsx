/* eslint-disable @typescript-eslint/no-explicit-any */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Main from "../src/yaml-generator/Main";
import catalog from "../src/assets/catalog.json";
import "..//src/index.css";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster />
    <Main providers={catalog as any} />
  </StrictMode>
);
