package routes

import (
	"github.com/gin-gonic/gin"

	"cadastro-api/controllers"
	"cadastro-api/middlewares"

)

func ServerInit() {
	r := gin.Default()
	r.Use(middlewares.CORS())
	r.GET("/api/usuarios", controllers.GetAllUsers)
	r.GET("/api/usuarios/:id", controllers.GetUser)
	r.POST("/api/usuarios", controllers.AddUser)
	r.DELETE("/api/usuarios/:id", controllers.DeleteUser)
	r.PUT("/api/usuarios/:id", controllers.EditUser)
	r.Run()
}
