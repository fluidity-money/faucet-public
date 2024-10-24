package faucet

import "time"

// Request made by a user, stored in the database.
type Request struct {
	Addr                 string
	IpAddr               string
	CreatedBy, UpdatedBy time.Time
	WasSent, IsFlyStaker bool
}
