import run from '@rollup/plugin-run';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import generatePackageJson from 'rollup-plugin-generate-package-json';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/server.mjs',
    format: 'es',
    sourcemap: true,
  },
  external: [
    '@apollo/server',
    '@apollo/server/express4',
    '@apollo/server/plugin/drainHttpServer',
    '@graphql-tools/merge',
    '@graphql-tools/schema',
    '@prisma/client',
    'body-parser',
    'cors',
    'dataloader',
    'express',
    'fast-deep-equal',
    'graphql',
    'graphql-scalars',
    'graphql-subscriptions',
    'graphql-ws/lib/use/ws',
    'http',
    'pick-random',
    'ws',
  ],
  plugins: [
    typescript({
      tsconfig: false,
      compilerOptions: {
        allowJs: false,
        allowSyntheticDefaultImports: true,
        baseUrl: './',
        forceConsistentCasingInFileNames: true,
        // When building for prod we dont want to output a broken build, however
        // during development it's valuable to emit broken builds for the watch
        // server to detect and log.
        noEmitOnError: process.env.NODE_ENV != 'development',
        noImplicitAny: true,
        paths: {
          '@/*': ['src/*'],
          '@generated/*': ['generated/*'],
        },
        preserveConstEnums: true,
        skipLibCheck: true,
        strict: true,
        target: 'es2016',
      },
    }),
    process.env.NODE_ENV == 'development' &&
      run({
        execArgv: ['-r', 'source-map-support/register'],
      }),
    process.env.NODE_ENV != 'development' &&
      copy({
        targets: [
          { src: 'prisma', dest: 'dist/' },
          { src: 'Dockerfile', dest: 'dist/' },
        ],
      }),
    process.env.NODE_ENV != 'development' &&
      generatePackageJson({
        baseContents: (packageJson) => ({
          devDependencies: {
            prisma: packageJson.devDependencies['prisma'],
          },
        }),
      }),
  ],
  watch: {
    buildDelay: 500,
  },
};
