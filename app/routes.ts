import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
    route("/sapper/", "./routes/home.tsx"),
    route("/sapper/easy", "./pages/Easy/Easy.tsx"),
    route("/sapper/medium", "./pages/Medium/Medium.tsx"),
    route("/sapper/hard", "./pages/Hard/Hard.tsx"),
    route("/sapper/custom", "./pages/Custom/Custom.tsx"),
    route("/sapper/table", "./pages/Table/Table.tsx"),
] satisfies RouteConfig;
