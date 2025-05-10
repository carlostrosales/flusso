package db

import (
	"database/sql"
	"log"
	"os"

	_ "github.com/lib/pq"
)

var DB *sql.DB

func Connect() {
	// Get the database URL from environment variables
	dsn := os.Getenv("DB_URL")
	if dsn == "" {
		log.Fatalf("DB_URL environment variable is not set")
	}

	// Connect to the database
	var err error
	DB, err = sql.Open("postgres", dsn)
	if err != nil {
		log.Fatalf("Failed to connect to the database: %v", err)
	}

	log.Println("Database connection is established successfully")

}
