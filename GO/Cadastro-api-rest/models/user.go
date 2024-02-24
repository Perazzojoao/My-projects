package models

import (
	"github.com/go-playground/validator/v10"
	"gorm.io/gorm"

)

type User struct {
	gorm.Model
	Nome     string `json:"nome" gorm:"not null" validate:"nome"`
	Cpf      string `json:"cpf" gorm:"unique;not null" validate:"cpf"`
	Email    string `json:"email" gorm:"unique;not null" validate:"email"`
	Password string `json:"password" gorm:"not null" validate:"min=6"`
}

var validate = validator.New(validator.WithRequiredStructEnabled())

func ValidaUser(user *User) error {
	validate.RegisterAlias("nome", "required,min=3,max=50,excludesall=!@#?")
	validate.RegisterAlias("cpf", "required,len=11,number")
	return validate.Struct(user)
}

type Login struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}