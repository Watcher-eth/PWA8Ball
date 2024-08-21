import { CodegenConfig } from '@graphql-codegen/cli';

const GRAPH_ENDPOINT_URL =
  "https://glimpse-main.up.railway.app";

const config: CodegenConfig = {
  schema: GRAPH_ENDPOINT_URL,
  // this assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure
  documents: ['src/**/*.{ts,tsx}'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'tgql',
      }
    }
  },
  ignoreNoDocuments: true,
};

export default config;