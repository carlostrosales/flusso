package main

import (
	"log"
	"net/http"

	"github.com/carlostrosales/flusso/config"
	"github.com/carlostrosales/flusso/db"
	"github.com/carlostrosales/flusso/routes"
)

func main() {
	// Load configuration
	config.LoadConfig()

	// Connect to the database
	db.Connect()

	// Initialize routes
	router := routes.InitRoutes()

	// Start the HTTP server
	log.Println("Server is running on port 8080")
	log.Fatal(http.ListenAndServe(":8080", router))
}
