package routes

import (
	"github.com/gin-gonic/gin"

	"cadastro-api/controllers"
	"cadastro-api/middlewares"
)

func ServerInit() {
	r := gin.Default()
	gin.SetMode(gin.ReleaseMode)
	r.Use(middlewares.CORS())

	r.GET("/api/usuarios", middlewares.Autenticar, controllers.GetAllUsers)
	r.GET("/api/usuarios/:id", middlewares.Autenticar, controllers.GetUser)
	r.DELETE("/api/usuarios/:id", middlewares.Autenticar, controllers.DeleteUser)
	r.PUT("/api/usuarios/:id", middlewares.Autenticar, controllers.EditUser)

	r.POST("/api/usuarios", controllers.AddUser)
	r.POST("/api/login", controllers.Login)
	r.GET("/api/logout", controllers.Logout)

	r.Run(":8080")
}
