package controllers

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"

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
			"Not found": "Id not found.",
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
			"Error": err.Error(),
		})
		return
	}
	database.DB.Create(&u)
	c.JSON(http.StatusOK, u)
}

func DeleteUser(c *gin.Context) {
	var u models.User
	id := c.Param("id")

	database.DB.First(&u, id)
	if u.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{
			"Not found": "Id não encontrado.",
		})
		return
	}
	database.DB.Delete(&u, id)
	c.JSON(http.StatusOK, gin.H{
		"DELETE": "User id = " + id + " deletado com sucesso.",
	})
}

func EditUser(c *gin.Context) {
	var u models.User
	id := c.Param("id")

	database.DB.First(&u, id)
	if u.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{
			"Not found": "Id não encontrado.",
		})
		return
	}
	err := c.ShouldBindJSON(&u)
	if err != nil {
		log.Println("Erro: json não recebido.")
		c.JSON(http.StatusBadRequest, gin.H{
			"Error": err.Error(),
		})
		return
	}
	database.DB.Model(&u).UpdateColumns(u)
	c.JSON(http.StatusOK, u)
}
