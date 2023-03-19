import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import rollupTypescript from 'rollup-plugin-typescript2';
import json from '@rollup/plugin-json';
import externals from 'rollup-plugin-node-externals';
import pkg from './package.json';
import terser from '@rollup/plugin-terser';

const getConfig = () => {
  const config = {
    input: 'src/runtime/index.ts',
    output: [
      {
        file: pkg.exports.require,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: pkg.exports.import,
        format: 'es',
        sourcemap: true,
      },
      // {
      //   name: pkg.name,
      //   file: pkg.exports.umd,
      //   format: "umd",
      //   sourcemap: true,
      //   plugins: [terser()],
      // },
    ],
    plugins: [
      externals(),
      json(),
      resolve(),
      commonjs(),
      rollupTypescript({
        clean: true,
        useTsconfigDeclarationDir: true,
      }),
    ],
  };
  return config;
};
export default getConfig();
