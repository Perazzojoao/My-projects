package main

import (
	"cadastro-api/database"
	"cadastro-api/routes"
	"fmt"
)

func main() {
	fmt.Println("Starting server")
	database.DBConnection()
	routes.ServerInit()
}
