
export type routeObject = {
    name: string,
    path: string,
    type: "menu" | "app"
}

const routes = [
    { name: "Home", path: "/", type: "menu" },
    { name: "Projects", path: "/projects", type: "menu" },
    { name: "Skills", path: "/skills", type: "menu" },
    { name: "About", path: "/about", type: "menu" },
    { name: "Tools", path: "/tools", type: "menu" },
  ] as const;

export const getMenuRoutes = (): routeObject[] => {
    return routes.filter(route => route.type === "menu");
}

