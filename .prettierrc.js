/* @see https://github.com/tailwindlabs/prettier-plugin-tailwindcss/issues/31#issuecomment-1024722576 */
const tailwindcss = require("prettier-plugin-tailwindcss");
const organizeImports = require("prettier-plugin-organize-imports");

const merged = {
  ...tailwindcss,
  parsers: {
    ...tailwindcss.parsers,
    ...Object.keys(organizeImports.parsers).reduce((acc, key) => {
      acc[key] = {
        ...tailwindcss.parsers[key],
        preprocess(code, options) {
          return organizeImports.parsers[key].preprocess(code, options);
        },
      };
      return acc;
    }, {}),
  },
};

module.exports = {
  plugins: [merged],
  printWidth: 120,
};
