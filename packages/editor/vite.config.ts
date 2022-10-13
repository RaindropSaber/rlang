import { defineConfig, UserConfigExport } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import rcjs from '@rollup/plugin-commonjs';

export default defineConfig(({ command, mode, ssrBuild }) => {
  const defaultConfig: UserConfigExport = {
    plugins: [
      // rcjs(),
      react({
        babel: {
          parserOpts: {
            plugins: ['decorators-legacy', 'classProperties'],
          },
        },
      }),
      dts({
        outputDir: 'dist',
        tsConfigFilePath: './tsconfig.json',
      }),
    ],
    resolve: {
      alias: [
        {
          find: '@antv/x6',
          replacement: '@antv/x6/dist/x6.js',
        },
        {
          find: '@antv/x6-react-shape',
          replacement: '@antv/x6-react-shape/lib',
        },
      ],
    },
  };
  const config: UserConfigExport = {};
  if (command === 'build') {
    (config.define = {
      'process.env.NODE_ENV': '"production"',
    }),
      (config.build = {
        // target: 'esnext',
        minify: false,
        lib: {
          name: 'RlangEditor',
          entry: 'src/index.tsx',
          formats: ['es', 'cjs', 'umd'],
        },
        sourcemap: 'inline',
      });
  } else {
  }
  return Object.assign(defaultConfig, config);
});
