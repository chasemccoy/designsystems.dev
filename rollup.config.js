import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/components/index.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'src/_includes/js/components.js',
  },
  plugins: [
    svelte({
      dev: !production,
      customElement: true,
      css: css => {
        postcss([autoprefixer])
          .process(css.code, { from: undefined })
          .then(result => {
            result.warnings().forEach(warning => {
              console.warn(warning.toString());
            });

            css.code = result.css;
            css.write('src/_includes/css/components.css');
          });
      },
    }),
    resolve({
      browser: true,
      // dedupe: importee =>
      //   importee === 'svelte' || importee.startsWith('svelte/'),
    }),
    commonjs(),
    production && terser(),
  ],
};
