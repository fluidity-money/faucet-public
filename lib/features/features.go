// feature: enable certain features in the code based on what's provided
// from our bucket, or with environment variables. Mocks out a new
// internal type that is requested from the func method to know what's
// enabled.

package features

import (
	"log/slog"
	"os"
	"strings"
)

// EnvFeatures to enable at runtime from env (optionally)
const EnvFeatures = "SPN_FEATURES"

// Features that are supported in the code based on the bucket or env.
type F struct {
	everything bool            // everything enabled if * was set in the env
	enabled    map[string]bool // enabled features
}

// Get some feature functionality support. Make a request if it's needed,
// or use EnvFeatures.
func Get() F {
	f := get()
	slog.Debug("enabled features",
		"features", f.enabled,
		"everything enabled?", f.everything,
	)
	return f
}

func get() F {
	// If SPN_FEATURES is not empty, then we set up the features based on the
	// arguments, assuming a dev is testing. Otherwise, we make a request.
	switch v := os.Getenv(EnvFeatures); v {
	case "*":
		// Everything should be enabled on request!
		return F{true, nil}
	case "none":
		return F{false, nil}
	default:
		keys := strings.Split(v, ",")
		enabled := make(map[string]bool, len(keys))
		for _, key := range keys {
			enabled[key] = true
		}
		return F{false, enabled}
	}
}

// Is the feature enabled for a specific binary "yes or no" question.
// Will enable everything if everything is enabled for features
// (development mode.)
func (f F) Is(name string) bool {
	return f.everything || f.enabled[name]
}

// OnFeature being enabled, run the thunk given.
func (f F) On(name string, k func() error) (r error) {
	if f.Is(name) {
		if err := k(); err != nil {
			r = err
		}
	}
	return
}
