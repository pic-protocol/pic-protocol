module.exports = function (context, options) {
  return {
    name: "tailwind-plugin",
    configureWebpack() {
      return {
        module: {
          rules: [
            {
              test: /\.ya?ml$/,
              type: "asset/source",
            },
          ],
        },
      };
    },
    configurePostCss(postcssOptions) {
      postcssOptions.plugins.push(require("@tailwindcss/postcss"));
      return postcssOptions;
    },
  };
};
