package routes

import (
	"github.com/gin-gonic/gin"

	"cadastro-api/controllers"
)

func ServerInit() {
	r := gin.Default()
	r.GET("/api/usuarios", controllers.GetAllUsers)
	r.Run()
}
