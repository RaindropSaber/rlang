import path from 'path';
import defaultConfig from '../../rollup.config';
import pkg from './package.json'; // 读取 package.json 配置
import alias from '@rollup/plugin-alias';

const name = pkg.name; // umd 模式的编译结果文件输出的全局变量名称
const config = {
  input: path.resolve(__dirname, 'src/index.ts'),
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    },
    {
      name,
      file: pkg.umd,
      format: 'umd',
    },
  ],
};
defaultConfig.plugins = [
  alias({
    entries: [{ find: 'nanoid', replacement: 'node_modules/nanoid/index.browser.js' }],
  }),
  ...defaultConfig.plugins,
];
export default Object.assign(defaultConfig, config);
