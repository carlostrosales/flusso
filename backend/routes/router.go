package routes

import (
	"encoding/json"
	"strconv"

	"net/http"

	"github.com/carlostrosales/flusso/models"
	"github.com/carlostrosales/flusso/stores"
	"github.com/gorilla/mux"
)

// InitRoutes initializes the HTTP routes
func InitRoutes() *mux.Router {
	router := mux.NewRouter()

	// Define routes by registering three routes mapping URL paths to handlers
	router.HandleFunc("/flows", createFlowHandler).Methods("POST")
	router.HandleFunc("/flows", getFlowsHandler).Methods("GET")
	router.HandleFunc("/flows/{id}", getFlowByIDHandler).Methods("GET")

	return router
}

// Define handlers

// createFlowHandler handles POST /flows
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

// getFlowHandler handles GET /flows
func getFlowsHandler(w http.ResponseWriter, r *http.Request) {
	flows, err := stores.GetAllFlows()
	if err != nil {
		http.Error(w, "Failed to retrieve flows", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(flows)
}

// getFlowByIDHandler handles GET /flows/{id}
func getFlowByIDHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
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
