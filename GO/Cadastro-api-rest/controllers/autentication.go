package controllers

import (
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"

	"cadastro-api/database"
	"cadastro-api/models"
)

func GenerateToken(c *gin.Context, u *models.User) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": u.ID,
		"exp": time.Now().Add(time.Minute * 30).Unix(),
	})
	return token.SignedString([]byte(os.Getenv("SECRET_KEY")))
}

func Login(c *gin.Context) {
	var l models.Login
	err := c.ShouldBindJSON(&l)
	if err != nil {
		log.Println("Erro: json não recebido.")
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	var u models.User
	database.DB.Where(&models.User{Email: l.Email}).First(&u)
	if u.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Usuário não cadastrado.",
		})
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(l.Password))
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Senha inválida.",
		})
		return
	}

	// Gerando jwt token
	tokenString, err := GenerateToken(c, &u)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	// Enviando token no cookie
	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("session_token", tokenString, 1800, "/", "", false, true)
	c.JSON(http.StatusOK, gin.H{})
}

func Logout(c *gin.Context) {
	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("session_token", "", -1, "/", "", false, true)
	c.JSON(http.StatusOK, gin.H{"message": "Logged out"})
}
