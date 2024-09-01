const { withNx } = require('@nx/rollup/with-nx');
const alias = require('@rollup/plugin-alias');
const terser = require('@rollup/plugin-terser');

module.exports = withNx(
  {
    main: './src/index.ts',
    outputPath: '../../dist/packages/kompact-core',
    tsConfig: './tsconfig.lib.json',
    compiler: 'swc',
    format: ['cjs', 'esm'],
    assets: [{ input: '.', output: '.', glob: '*.md' }],
  },
  {
    // Provide additional rollup configuration here. See: https://rollupjs.org/configuration-options
    // e.g.
    // output: { sourcemap: true },
    plugins: [
      terser(),
      alias({
        entries: [
          { find: '@constant', replacement: './src/constant' },
          { find: '@core', replacement: './src/core' },
          { find: '@decorator', replacement: './src/decorator' },
          { find: '@interface', replacement: './src/interface' },
          { find: '@logger', replacement: './src/logger' },
          { find: '@utils', replacement: './src/utils' },
        ],
      }),
    ],
  }
);
