package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	DBURL string
}

func LoadConfig() Config {
	// Load env variables from .env file
	err := godotenv.Load("../.env")
	if err != nil {
		log.Fatalf("Error loading .env file, %v", err)
	}

	return Config{
		DBURL: os.Getenv("DB_URL"),
	}
}
