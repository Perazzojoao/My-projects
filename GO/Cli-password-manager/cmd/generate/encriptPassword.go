package generate

import (
	"golang.org/x/crypto/bcrypt"

)

func Encrypt(senha string) string {
	hash, err := bcrypt.GenerateFromPassword([]byte(senha), bcrypt.DefaultCost)
	if err != nil {
		panic(err)
	}

	return string(hash)
}
