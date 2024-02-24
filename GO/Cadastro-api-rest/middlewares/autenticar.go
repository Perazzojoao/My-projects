package middlewares

import (
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"

	"cadastro-api/database"
	"cadastro-api/models"

)

func Autenticar(c *gin.Context) {
	// Get the token from the cookie
	tokenString, err := c.Cookie("session_token")
	if err != nil {
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	// Decode and validate the token
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, jwt.ErrSignatureInvalid
		}
		return []byte(os.Getenv("SECRET_KEY")), nil
	})
	if err != nil {
		c.AbortWithError(http.StatusUnauthorized, err)
		return
	}

	// Check claims and if the token is valid
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {

		// Check expiration date
		if float64(time.Now().Unix()) > claims["exp"].(float64) {
			c.AbortWithStatus(http.StatusUnauthorized)
		}

		// Check if the user exists
		var u models.User
		database.DB.First(&u, claims["sub"])
		if u.ID == 0 {
			c.AbortWithStatus(http.StatusUnauthorized)
		}

		// Set the user in the context
		c.Set("user", u)

		// Continue
		c.Next()
		
	} else {
		c.AbortWithStatus(http.StatusUnauthorized)
	}
}
