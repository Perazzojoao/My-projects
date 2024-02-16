package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Nome     string `json:"nome"`
	Cpf      string `json:"cpf"`
	Email    string `json:"email"`
	Password string `json:"password"`
}
