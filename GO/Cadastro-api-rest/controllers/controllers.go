package controllers

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"

	"cadastro-api/database"
	"cadastro-api/models"
)

func GetAllUsers(c *gin.Context) {
	var u []models.User
	database.DB.Find(&u)
	c.JSON(http.StatusOK, u)
}

func GetUser(c *gin.Context) {
	var u models.User
	id := c.Params.ByName("id")

	database.DB.First(&u, id)
	if u.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Id not found.",
		})
		return
	}
	c.JSON(http.StatusOK, u)
}

func AddUser(c *gin.Context) {
	var u models.User
	err := c.ShouldBindJSON(&u)
	if err != nil {
		log.Println("Erro: json não recebido.")
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	if err = models.ValidaUser(&u); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
	if err != nil {
		log.Println("Erro: Hash não gerado.")
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}
	u.Password = string(hash)

	database.DB.Create(&u)
	if u.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Usuário já cadastrado.",
		})
		return
	}

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
	c.JSON(http.StatusOK, u)
}

func DeleteUser(c *gin.Context) {
	var u models.User
	id := c.Param("id")

	database.DB.First(&u, id)
	if u.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Id não encontrado.",
		})
		return
	}
	database.DB.Delete(&u, id)
	c.JSON(http.StatusOK, gin.H{
		"delete": "User id = " + id + " deletado com sucesso.",
	})
}

func EditUser(c *gin.Context) {
	var u models.User
	id := c.Param("id")

	database.DB.First(&u, id)
	if u.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Id não encontrado.",
		})
		return
	}
	err := c.ShouldBindJSON(&u)
	if err != nil {
		log.Println("Erro: json não recebido.")
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	if err = models.ValidaUser(&u); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	tx := database.DB.Model(&u).UpdateColumns(u)
	if tx.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Erro ao atualizar usuário. Cpf ou email já cadastrados!",
		})
		return
	}
	c.JSON(http.StatusOK, u)
}
