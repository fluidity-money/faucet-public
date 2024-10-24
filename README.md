
# Superposition Faucet (public edition)

This faucet is a MIT licensed (as is the original) single repo version of the faucet that
we've been running out of a private repo and
https://github.com/fluidity-money/long.so/tree/development/cmd/faucet.superposition for
some time.

It is a three part repo, a graph that spools requests to the database, a runner that
should be run at a desired frequency (and combined with a webhook alert - example in the
repo), and a static webapp.

It can optionally be configured to use a Turnstile token using a feature flag. Features
for the Go code is contained in lib/features/list.go .

## Configuration

`pkg/Faucet.sol:56` could be configured to handle error conditions differently.

`web/app/app.tsx:18` could be configured to use different images. And the rest of the faucet
should be configured to use different addresses for things.

`web/sentry.server.config.ts:8`, `web/sentry.edge.config.ts:9`, and
`web/sentry.client.config.ts:8` should be configured to have a Sentry DSN URL.

`web/app/app.tsx:10` should be configured to have the address of the faucet graph.

## Dependencies

- Go
- Forge Foundry
- Pnpm

## Building

	make

## Notes

1. The GraphQL server should be run somewhere. We recommend Stellate (https://stellate.sh)
as middleware. You could run it as a lambda, or on a normal host somewhere, depending on
the environment variables.
2. The runner should be run in a loop with some reporting to a webhook every 15 seconds or so.

## Running


