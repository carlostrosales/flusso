package db

import (
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	// Get the database connection details from environment variables
	dsn := os.Getenv("DB_URL")
	if dsn == "" {
		log.Fatalf("DB_URL environment variable is not set")
	}

	// Connect to the database using GORM
	var err error
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to the database: %v", err)
	}

	log.Println("Database connection is established successfully")

}
