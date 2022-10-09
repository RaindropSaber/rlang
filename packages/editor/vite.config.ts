import { defineConfig, UserConfigExport } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig(({ command, mode, ssrBuild }) => {
  const defaultConfig: UserConfigExport = {
    plugins: [
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
      ],
    },
  };
  const config: UserConfigExport = {};
  if (command === 'build') {
    // dev 独有配置
    config.build = {
      lib: {
        name: 'RlangEditor',
        entry: 'src/index.tsx',
        formats: ['es', 'cjs', 'umd'],
      },
      sourcemap: 'inline',
    };
  } else {
  }
  return Object.assign(defaultConfig, config);
});
