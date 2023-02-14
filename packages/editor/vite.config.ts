import { defineConfig, UserConfigExport } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import commonjs from '@rollup/plugin-commonjs';
import path from 'path';

export default defineConfig(({ command, mode, ssrBuild }) => {
  const defaultConfig: UserConfigExport = {
    plugins: [
      dts({
        outputDir: path.resolve(__dirname, 'dist/types'),
        tsConfigFilePath: path.resolve(__dirname, './tsconfig.json'),
      }),
      commonjs(),
      react({
        babel: {
          parserOpts: {
            plugins: ['decorators-legacy', 'classProperties'],
          },
        },
      }),
    ],
    resolve: {
      alias: [
        // {
        //   find: '@antv/x6',
        //   replacement: 'node_modules/@antv/x6/dist/x6.js',
        // },
        // {
        //   find: '@antv/x6-react-shape',
        //   replacement: '@antv/x6-react-shape/lib',
        // },
      ],
    },
  };
  const config: UserConfigExport = {};
  if (command === 'build') {
    config.define = {
      'process.env.NODE_ENV': '"production"',
    };
    config.build = {
      lib: {
        name: 'RlangEditor',
        entry: path.resolve(__dirname, 'src/index.tsx'),
        formats: ['es', 'umd', 'cjs'],
        fileName: 'index',
      },
      sourcemap: true,
    };
  }
  return Object.assign(defaultConfig, config);
});
