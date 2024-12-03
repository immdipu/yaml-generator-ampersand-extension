import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Main from "../src/yaml-generator/Main";
import catalog from "../src/assets/catalog.json";
import "..//src/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Main providers={catalog as any} />
  </StrictMode>
);
