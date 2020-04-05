import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

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
      customElement: true
    }),
    resolve({
      browser: true,
    }),
    commonjs(),
    production && terser(),
  ],
};
