import React from "react";
import { createRoot } from "react-dom/client";
import Redirect from "./components/auth/Redirect";

const root = createRoot(document.getElementById("authorized-root"));
root.render(<Redirect />);
