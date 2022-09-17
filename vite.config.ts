import { sveltekit } from "@sveltejs/kit/vite";
import type { UserConfig } from "vite";

let hash = process.env.CF_PAGES_COMMIT_SHA?.substring(0, 7) || "-";

const config: UserConfig = {
  plugins: [sveltekit()],
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __SHA1_HASH__: JSON.stringify(hash),
  },
};

export default config;
