import path from 'path';
import defaultConfig from '../../rollup.config';
import pkg from './package.json'; // 读取 package.json 配置
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
export default Object.assign(defaultConfig, config);
