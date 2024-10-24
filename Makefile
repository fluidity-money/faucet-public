
include cmd/build.mk

GOLIB := $(shell find lib -type f)

build: faucet.graphql faucet.runner

faucet.graphql: $(shell find cmd/faucet.graphql -type f -name '*.go') ${GOLIB}
	@cd cmd/faucet.graphql && make && mv faucet.graphql ../..

faucet.runner: $(shell find cmd/faucet.runner -type f -name '*.go') ${GOLIB}
	@cd cmd/faucet.runner && make && mv faucet.runner ../..
