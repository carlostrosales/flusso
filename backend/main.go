package main

import (
	"log"
	"net/http"

	_ "github.com/carlostrosales/flusso/docs"

	httpSwagger "github.com/swaggo/http-swagger"

	"github.com/carlostrosales/flusso/config"
	"github.com/carlostrosales/flusso/db"
	"github.com/carlostrosales/flusso/routes"
)

// @title Flusso API
// @version 1.0
// @decription This is the API documentation for Flusso
// @host localhost:8080
// @BasePath /

// @contact.name API support
// @contact.email support@flusso.dev

func main() {
	// Load configuration
	config.LoadConfig()

	// Connect to the database
	db.Connect()

	// Initialize routes
	mux := http.NewServeMux()
	routes.RegisterRoutes(mux)

	// Add Swagger endpoint
	mux.Handle("/swagger/", httpSwagger.WrapHandler)

	// Start the HTTP server
	log.Println("Server is running on port 8080")
	log.Fatal(http.ListenAndServe(":8080", mux))
}
