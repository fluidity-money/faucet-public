import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.FAUCET_GRAPHQL_SCHEMA,
  documents: ["app/**/*.tsx", "app/**/*.ts"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "app/gql/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
