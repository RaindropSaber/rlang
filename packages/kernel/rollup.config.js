import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import externals from 'rollup-plugin-node-externals';
import rollupTypescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

const getConfig = () => {
  const config = {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.exports.node.require,
        format: 'cjs',
        sourcemap: true,
        plugins: [],
      },
      {
        file: pkg.exports.node.import,
        format: 'es',
        sourcemap: true,
      },
      {
        file: pkg.exports.browser.require,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: pkg.exports.browser.import,
        format: 'es',
        sourcemap: true,
      },
      {
        name: pkg.name,
        file: pkg.exports.browser.umd,
        format: 'umd',
        sourcemap: true,
        plugins: [terser()],
      },
    ].filter(({ format }) => (process.env.umd ? format === 'umd' : format !== 'umd')),
    plugins: [
      externals({ deps: !process.env.umd }),
      alias(
        process.env.umd
          ? {
              entries: [
                {
                  find: 'nanoid',
                  replacement: 'node_modules/nanoid/index.browser.js',
                },
              ],
            }
          : {}
      ),
      json(),
      // 解析第三方依赖
      resolve(),
      // 识别 commonjs 模式第三方依赖
      commonjs(),
      // rollup 编译 typescript
      rollupTypescript({
        clean: true,
        useTsconfigDeclarationDir: true,
      }),
    ],
  };
  return config;
};
export default getConfig();
