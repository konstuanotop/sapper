import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("./routes/home.tsx"),
    route("/easy", "./pages/Easy/Easy.tsx"),
    route("/medium", "./pages/Medium/Medium.tsx"),
    route("/hard", "./pages/Hard/Hard.tsx"),
    route("/custom", "./pages/Custom/Custom.tsx"),
    route("/table", "./pages/table/Table.tsx"),

] satisfies RouteConfig;
