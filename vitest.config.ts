import { defineConfig, UserConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export const commonConfig: UserConfig = {
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    include: ['src/**/*.{spec,test}.ts'],
  },
};

export default defineConfig({
  ...commonConfig,
  test: {
    ...commonConfig.test,
    coverage: {
      provider: 'istanbul',
    },
  },
});
