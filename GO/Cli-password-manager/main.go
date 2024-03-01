/*
Copyright © 2024 NAME HERE <EMAIL ADDRESS>
*/
package main

import (
	"fmt"
	"time"

	"password-dcrypt/cmd"
)

var tempo = time.Now()

func main() {
	cmd.Execute()
	tempoExecucao()
}

func tempoExecucao() {
	fmt.Println("Tempo de execução: ", time.Since(tempo))
}
