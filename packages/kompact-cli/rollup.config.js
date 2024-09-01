import { withNx } from '@nx/rollup/with-nx.js';
import terser from '@rollup/plugin-terser';
import copy from 'rollup-plugin-copy';

export default withNx(
  {
    main: './src/index.ts',
    outputPath: '../../dist/packages/kompact-cli',
    rollupConfig: 'packages/kompact-cli/rollup.config.js',
    project: 'packages/kompact-cli/package.json',
    tsConfig: './tsconfig.lib.json',
    compiler: 'swc',
    format: ['esm'],
    assets: [{ input: '.', output: '.', glob: '*.md' }],
  },
  {
    // Provide additional rollup configuration here. See: https://rollupjs.org/configuration-options
    // e.g.
    // output: { sourcemap: true },
    plugins: [
      copy({
        targets: [
          {
            src: 'templates',
            dest: '../../dist/packages/kompact-cli',
          },
        ],
      }),
      terser(),
    ],
  }
);
