package models

import (
	"time"
)

// Flow represents one recorded session
type Flow struct {
	ID         uint      // Primary Key
	Name       string    // Name of the flow
	EventsJSON string    // location of the event
	VideoURL   string    // location of video + audio of recorded event
	CreatedAt  time.Time // Timestamp when the flow was created
	UpdatedAt  time.Time // Timestamp the flow was last updated
}
