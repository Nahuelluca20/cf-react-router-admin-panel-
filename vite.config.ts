import {
  vitePlugin as react,
  cloudflareDevProxyVitePlugin,
} from "@react-router/dev";
import path from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    cloudflareDevProxyVitePlugin(),
    react({ ignoredRouteFiles: ["**/*server.ts", "**/*.css?url"] }),
  ],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./app"),
    },
  },
});
