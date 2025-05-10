package stores

import (
	"log"

	"github.com/carlostrosales/flusso/db"
	"github.com/carlostrosales/flusso/models"
)

// InsertFlow inserts a new flow into the database
func InsertFlow(flow models.Flow) error {
	query := "INSERT INTO flows (name, events_json, video_url, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING id"
	err := db.DB.QueryRow(query, flow.Name, flow.EventsJSON, flow.VideoURL).Scan(&flow.ID)
	if err != nil {
		log.Printf("Error inserting flow: %v", err)
	}
	return nil
}

// GetAllFlows retrieves all flows from the database
func GetAllFlows() ([]models.Flow, error) {
	query := "SELECT id, name, events_json, video_url, created_at, updated_at FROM flows"
	rows, err := db.DB.Query(query)
	if err != nil {
		log.Printf("Error retrieving flows:")
		return nil, err
	}
	defer rows.Close()

	var flows []models.Flow
	for rows.Next() {
		var flow models.Flow
		err := rows.Scan(&flow.ID, &flow.Name, &flow.EventsJSON, &flow.VideoURL, &flow.CreatedAt, &flow.UpdatedAt)
		if err != nil {
			log.Printf("Error scanning flow: %v", err)
			return nil, err
		}
		flows = append(flows, flow)
	}

	return flows, nil
}

// GetFlowbyID retrieves a flow from the database
func GetFlowByID(id int) (models.Flow, error) {
	var flow models.Flow
	query := "SELECT id, name, events_json, video_url, created_at, updated_at FROM flows WHERE id = $1"
	err := db.DB.QueryRow(query, id).Scan(&flow.ID, &flow.Name, &flow.EventsJSON, &flow.VideoURL, &flow.CreatedAt, &flow.UpdatedAt)
	if err != nil {
		return flow, err
	}
	return flow, nil
}
