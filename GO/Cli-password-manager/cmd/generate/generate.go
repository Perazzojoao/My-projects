/*
Copyright © 2024 NAME HERE <EMAIL ADDRESS>
*/
package generate

import (
	"fmt"
	"math/rand"
	"os"
	"time"

	"github.com/atotto/clipboard"
	"github.com/spf13/cobra"

	"password-dcrypt/estilos"
)

var (
	tamanho   int
	save      bool
	encriptar bool
	cores     = estilos.Styles
)

// generateCmd represents the generate command
var GenerateCmd = &cobra.Command{
	Use:   "gerar",
	Short: "Gera senhas aleatórias",
	Long:  `Gera senhas aleatórias de acordo com o tamanho informado e salva no em um arquivo. O tamanho padrão é 12.`,
	Run: func(cmd *cobra.Command, args []string) {
		if encriptar && !save {
			fmt.Println(`A flag "encriptar" só pode ser usada em conjunto com a flag "salvar"`)
			os.Exit(1)
		}

		senha := gerarSenha(int(tamanho))
		fmt.Println(cores.Color(cores.Green, "Senha gerada:"), cores.Color(cores.Cyan, senha))
		fmt.Println(cores.Color(cores.Yellow, "Senha copiada para a área de transferência!"))
		println()

		if save {
			SalvarSenha(senha)
		}
	},
}

func gerarSenha(tamanho int) string {
	source := rand.NewSource(time.Now().UnixNano())
	random := rand.New(source)
	letrasMaiusculas := []rune("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
	numeros := []rune("0123456789")
	especiais := []rune("!@#$%^&*")

	senha := make([]rune, tamanho)
	senha[0] = letrasMaiusculas[random.Intn(len(letrasMaiusculas))]
	senha[1] = numeros[random.Intn(len(numeros))]
	senha[2] = especiais[random.Intn(len(especiais))]

	todosCaracteres := []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*")
	for i := 3; i < tamanho; i++ {
		senha[i] = todosCaracteres[random.Intn(len(todosCaracteres))]
	}

	random.Shuffle(len(senha), func(i, j int) {
		senha[i], senha[j] = senha[j], senha[i]
	})

	err := clipboard.WriteAll(string(senha))
	if err != nil {
		fmt.Println(cores.Color(cores.Red, err.Error()))
	}
	return string(senha)
}

func init() {
	GenerateCmd.Flags().IntVarP(&tamanho, "tamanho", "t", 12, "Tamanho da senha")
	GenerateCmd.Flags().BoolVarP(&save, "salvar", "s", false, "Salvar senha em arquivo .txt")
	GenerateCmd.Flags().BoolVarP(&encriptar, "encriptar", "e", false, "Encriptar senha salva em arquivo .txt")

}
