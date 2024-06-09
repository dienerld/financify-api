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
    include: ['src/**/*.{spec,test,e2e}.ts'],
    coverage: {
      reporter: ['html', 'lcov'],
      include: ['src/**/*.ts'],
      exclude: [
        'src/**/*.d.ts',
        'src/**/*.spec.ts',
        'src/**/*.test.ts',
        'src/**/__tests__/**',
        'src/**/__mocks__/**',
        'src/**/__fixtures__/**',
        '**/*.module.ts',
        '**/*-mock.ts',
        '**/*.provider.ts',
        '**/*.guard.ts',
        '**/*.decorator.ts',
        '**/common/**/*.ts',
        '**/exception/**/*.ts',
        '**/config/docs/*.ts',
      ],
    },
  },
};

export default defineConfig(commonConfig);
