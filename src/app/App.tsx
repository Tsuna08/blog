import { RouterProvider } from "react-router-dom";

import { router } from "@/app/routers/router";

export function App() {
  return <RouterProvider router={router} />;
}

export default App;
