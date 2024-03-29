/*
Copyright © 2024 NAME HERE <EMAIL ADDRESS>
*/
package generate

import (
	"fmt"
	"math/rand"
	"sync"
	"time"

	"github.com/atotto/clipboard"
	"github.com/spf13/cobra"

	"password-dcrypt/estilos"
)

var (
	tamanho   int
	save      bool
	encriptar bool
	nome      string
	cores     = estilos.Styles
)

// generateCmd represents the generate command
var GenerateCmd = &cobra.Command{
	Use:       "gerar",
	Short:     "Gera senhas aleatórias",
	Long:      `Gera senhas aleatórias de acordo com o tamanho informado e salva no em um arquivo. O tamanho padrão é 12.`,
	ValidArgs: []string{"[nome]"},
	Args:      cobra.MaximumNArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		if len(args) > 0 {
			nome = args[0]
		} else {
			nome = "Senha"
		}

		senha := gerarSenha(int(tamanho))
		fmt.Println(cores.Color(cores.Green, "Senha gerada:"), cores.Color(cores.Cyan, senha))
		fmt.Println(cores.Color(cores.Yellow, "Senha copiada para a área de transferência!"))
		println()

		if save || encriptar {
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

	mx := sync.Mutex{}
	wg := sync.WaitGroup{}
	wg.Add(tamanho - 3)
	todosCaracteres := []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*")
	for i := 3; i < tamanho; i++ {
		go func() {
			mx.Lock()
			senha[i] = todosCaracteres[random.Intn(len(todosCaracteres))]
			mx.Unlock()
			wg.Done()
		}()
	}

	wg.Wait()
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
	GenerateCmd.Flags().BoolVarP(&encriptar, "encriptar", "e", false, "Encriptar e salvar senha em arquivo .txt")
	GenerateCmd.MarkFlagsMutuallyExclusive("salvar", "encriptar")

}
