import { mdsvex } from "mdsvex";
import adapter from "@sveltejs/adapter-static";
import preprocess from "svelte-preprocess";

const mdsvexConfig = {
  extensions: [".md", ".svx"],
  layout: {
    _: "./src/layouts/Blog.svelte",
  },
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors

  extensions: [".svelte", ".html", ...mdsvexConfig.extensions],

  preprocess: [mdsvex(mdsvexConfig), preprocess()],

  kit: {
    adapter: adapter(),
  },
};

export default config;
