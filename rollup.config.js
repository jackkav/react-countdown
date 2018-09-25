import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";

export default {
  input: "./src/index.js",
  output: {
    file: "dist/index.js",
    format: "cjs"
  },
  external: ["react"],
  plugins: [
    nodeResolve(),
    commonjs({
      include: "node_modules/**"
    }),
    babel({
      exclude: "node_modules/**"
    })
  ]
};
