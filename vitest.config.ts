import swc from 'unplugin-swc';
import { defineConfig, UserConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export const commonConfig: UserConfig = {
  plugins: [
    tsconfigPaths(),
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
  test: {
    globals: true,
    include: ['src/**/*.{spec,test}.ts'],
  },
};

export default defineConfig(commonConfig);
