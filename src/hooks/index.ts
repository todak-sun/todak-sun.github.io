import { Pages, RouteCreation } from "@/types";

export const createRouteCreations = <T, E>(pages: Pages<T, E>) => {
  const routeCreations = Object.entries(pages)
    .map<RouteCreation<T, E> | undefined>(([path, page]) => {
      const fileName = path.match(/\.\/pages\/(.*)\.tsx$/)?.[1];
      if (!fileName) {
        return;
      }
      const normalizedPathName = fileName.includes("$")
        ? fileName.replace("$", ":")
        : fileName.replace(/\/index/, "");

      return {
        path:
          fileName === "index" ? "/" : `/${normalizedPathName.toLowerCase()}`,
        Element: page.default,
        loader: page?.loader,
        action: page?.action,
        ErrorBoundary: page?.ErrorBoundary,
      };
    })
    .filter((v) => v) as RouteCreation<T, E>[];

  return routeCreations;
};
