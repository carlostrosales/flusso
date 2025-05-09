package main

import (
	"github.com/carlostrosales/flusso/config"
	"github.com/carlostrosales/flusso/db"
	"github.com/carlostrosales/flusso/routes"
)

func main() {
	config.LoadConfig()
	db.Connect()
	routes.InitRoutes()
}
