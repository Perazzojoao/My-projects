package routes

import (
	"github.com/gin-gonic/gin"

	"cadastro-api/controllers"
)

func ServerInit() {
	r := gin.Default()
	r.GET("/api/usuarios", controllers.GetAllUsers)
	r.GET("/api/usuarios/:id", controllers.GetUser)
	r.POST("/api/usuarios", controllers.AddUser)
	r.DELETE("/api/usuarios/:id", controllers.DeleteUser)
	r.PUT("/api/usuarios/:id", controllers.EditUser)
	r.Run()
}
