package database

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"cadastro-api/models"
)

var (
	DB  *gorm.DB
	err error
)

func DBConnection() {
	godotenv.Load()
	dns := fmt.Sprintf("host=localhost user=%s password=%s dbname=%s port=5432 sslmode=disable", os.Getenv("DB_USER"), os.Getenv("DB_PASSWORD"), os.Getenv("DB_NAME"))
	DB, err = gorm.Open(postgres.Open(dns))
	if err != nil {
		fmt.Println("Erro ao conectar com database")
		log.Panic(err.Error())
	}
	DB.AutoMigrate(&models.User{})
}
