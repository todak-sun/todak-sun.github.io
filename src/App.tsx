import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { createRouteCreations } from "./hooks";
import { PageInitialProps, Pages } from "./types";

const pages: Pages<PageInitialProps, { error?: Error }> = import.meta.glob(
  "./pages/**/*.tsx",
  { eager: true }
);
const routeCreations = createRouteCreations(pages);
const router = createBrowserRouter(
  routeCreations.map(({ Element, ErrorBoundary, ...rest }) => ({
    ...rest,
    element: <Element pathname={rest.path} />,
    ...(ErrorBoundary && { errorElement: <ErrorBoundary /> }),
  }))
);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
