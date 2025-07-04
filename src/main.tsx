import { ThemeProvider } from "@mui/material/styles";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import App from "@/app/App";
import { store } from "@/app/store/store";
import { theme } from "@/shared/theme/palette";

import { AuthProvider } from "./app/providers/AuthProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
