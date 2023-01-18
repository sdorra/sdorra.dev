export default {
  stories: "components/**/*.stories.{js,jsx,ts,tsx}",
  viteConfig: ".ladle/vite.config.ts",
  addons: {
    rtl: {
      enabled: false,
    },
    width: {
      enabled: true,
      options: {
        xs: 320,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
        "2xl": 1536,
      },
      defaultState: 0,
    },
  },
};
