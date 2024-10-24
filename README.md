
# Superposition Faucet (public edition)

This faucet is a MIT licensed (as is the original) single repo version of the faucet that
we've been running out of a private repo and
https://github.com/fluidity-money/long.so/tree/development/cmd/faucet.superposition for
some time.

It is a three part repo, a graph that spools requests to the database, a runner that should be run at a desired frequency (and combined with a webhook alert - example in the repo), and a static webapp.

It can optionally be configured to use a Turnstile token using a feature flag. Features
for the Go code is contained in lib/features/list.go .

## Building

	make build

## Running


