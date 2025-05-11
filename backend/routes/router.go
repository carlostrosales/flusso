package routes

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"

	"github.com/carlostrosales/flusso/models"
	"github.com/carlostrosales/flusso/stores"
)

// InitRoutes initializes the HTTP routes
func RegisterRoutes(mux *http.ServeMux) {
	// Define routes by registering three routes mapping URL paths to handlers
	mux.HandleFunc("/flows", createFlowHandler)
	mux.HandleFunc("/flows/", getFlowsHandler)
	mux.HandleFunc("/flows/{id}", getFlowByIDHandler)

}

// @Summary Create a new flow
// @Description Create a new flow with the provided details
// @Tags flows
// @Accept json
// @Produce json
// @Param flow body models.Flow true "Flow data"
// @Success 201 {object} models.Flow
// @Failure 400 {string} string "Invalid request payload"
// @Failure 500 {string} string "Failed to create flow"
// @Router /flows [post]
func createFlowHandler(w http.ResponseWriter, r *http.Request) {
	var flow models.Flow
	err := json.NewDecoder(r.Body).Decode(&flow)
	if err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	err = stores.InsertFlow(flow)
	if err != nil {
		http.Error(w, "Failed to create flow", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(flow)
}

// @Summary Get all flows
// @Description Retrieve all flows from the database
// @Tags flows
// @Produce json
// @Success 200 {array} models.Flow
// @Failure 500 {string} string "Failed to retrieve flows"
// @Router /flows/ [get]
func getFlowsHandler(w http.ResponseWriter, r *http.Request) {
	flows, err := stores.GetAllFlows()
	if err != nil {
		http.Error(w, "Failed to retrieve flows", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(flows)
}

// @Summary Get a flow by ID
// @Description Retrieve a single flow by its ID
// @Tags flows
// @Produce json
// @Param id path int true "Flow ID"
// @Success 200 {object} models.Flow
// @Failure 400 {string} string "Invalid flow ID"
// @Failure 404 {string} string "Flow not found"
// @Router /flows/{id} [get]
func getFlowByIDHandler(w http.ResponseWriter, r *http.Request) {

	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}

	// Extract the ID from the URL path
	idStr := strings.TrimPrefix(r.URL.Path, "/flows/")

	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Invalid flow ID", http.StatusBadRequest)
		return
	}

	flow, err := stores.GetFlowByID(id)
	if err != nil {
		http.Error(w, "Flow not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(flow)
}
