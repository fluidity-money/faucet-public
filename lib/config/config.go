// config contains configuration behaviour that should be configured
// using environment variables that're global.

package config

import (
	"math/rand"
	"os"
	"strings"

	"github.com/fluidity-money/faucet-public/lib/setup"
)

// C is configuration for each service, and globally.
type C struct {
	GethUrl       string
	TimescaleUrls []string
}

// Get config by querying environment variables.
func Get() C {
	/* Global RPC configuration. */
	gethUrl := os.Getenv("SPN_GETH_URL")
	if gethUrl == "" {
		setup.Exitf("SPN_GETH_URL not set")
	}
	timescaleUrl := os.Getenv("SPN_TIMESCALE")
	if timescaleUrl == "" {
		setup.Exitf("SPN_TIMESCALE not set")
	}
	timescaleUrls := strings.Split(timescaleUrl, ",")
	return C{
		GethUrl:       gethUrl,
		TimescaleUrls: timescaleUrls,
	}
}

func (c C) PickTimescaleUrl() string {
	return c.TimescaleUrls[rand.Intn(len(c.TimescaleUrls))]
}
