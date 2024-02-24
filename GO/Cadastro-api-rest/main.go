package main

import (
	"cadastro-api/database"
	"cadastro-api/routes"
)

func main() {
	database.DBConnection()
	routes.ServerInit()
}
