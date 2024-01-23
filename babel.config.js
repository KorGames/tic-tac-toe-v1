module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            assets: "./src/assets",
            components: "./src/components",
            navigation: "./src/navigation",
            screens: "./src/screens",
            services: "./src/services",
            store: "./src/store",
            types: "./src/types",
            utils: "./src/utils",
          },
        },
      ],
    ],
  };
};
