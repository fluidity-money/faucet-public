
# Superposition Faucet

This is a simple faucet application that chats with the deployed Graph at
https://faucet-graph.superposition.so. This sends the user a random amount of tokens using
a on-chain smart contract that optionally does batching.

## Building

	next build

## Environment variables

|          Name           |                      Description                       |
|-------------------------|--------------------------------------------------------|
| `FAUCET_GRAPHQL_SCHEMA` | Path to the GraphQL schema for client code generation. |
