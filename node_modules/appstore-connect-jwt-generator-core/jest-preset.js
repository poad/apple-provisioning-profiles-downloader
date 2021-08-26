const { defaults } = require("jest-config");
const { version } = require("jest/package.json");
const warning =
  "@marko/jest preset will not work with jest@26 and above. Instead use @marko/jest/preset/browser or @marko/jest/preset/node.";

if (parseInt(version.split(".")[0], 10) >= 26) {
  throw new Error(warning);
} else {
  console.warn(warning);
}

module.exports = {
  // uses a webpack style resolver, the default one has many issues.
  resolver: "enhanced-resolve-jest",
  // allows for stuff like file watching of `.marko` files
  moduleFileExtensions: defaults.moduleFileExtensions.concat("marko"),
  // preprocesses Marko files.
  transform: {
    "\\.marko$": require.resolve("./transform/node"),
    "\\.[tj]s$": "babel-jest"
  },
  // Jest ignores node_module transforms by default.
  // Here we whitelist all `.marko` files.
  transformIgnorePatterns: ["node_modules/.*(?<!\\.marko)$"]
};
