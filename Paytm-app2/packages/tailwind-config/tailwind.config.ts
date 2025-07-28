import type { Config } from "tailwindcss";

// This config should NOT include a "content" key.
const config: Omit<Config, "content"> = {
  theme: {
    extend: {
      // Your shared theme extensions (colors, fonts, etc.) go here
    },
  },
  plugins: [],
};

export default config;