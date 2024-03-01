/*
Copyright © 2024 NAME HERE <EMAIL ADDRESS>
*/
package decrypt

import (
	"crypto/aes"
	"crypto/cipher"
	"fmt"

	"github.com/spf13/cobra"
	"github.com/spf13/viper"

	"password-dcrypt/estilos"
)

var (
	secretKey string
	FilePath  string
	cores     = estilos.Styles
)

// decryptCmd represents the decrypt command
var DecryptCmd = &cobra.Command{
	Use:   "decrypt",
	Short: "Desencriptar senhas",
	Long:  `Desencripta senhas que foram encriptadas pelo programa. Pode, também, desencripitar senhas alvas em arquivos .txt.`,
	Run: func(cmd *cobra.Command, args []string) {
		secretKey = viper.GetViper().GetString("key")
		if len(args) != 0 {
			senha, err := desencriptar([]byte(args[0]), []byte(secretKey))
			if err != nil {
				fmt.Println(cores.Color(cores.Red, err.Error()))
				return
			}
			fmt.Println(cores.Color(cores.Green, "Senha desencriptada: "), cores.Color(cores.Cyan, string(senha)))
			return
		}
		file, err := ReadFile(FilePath)
		if err != nil {
			fmt.Println(cores.Color(cores.Red, err.Error()))
			return
		}
		fmt.Println(cores.Color(cores.Green, "Senhas desenencriptadas: "))
		dateList, timeList := file.GetTimeLogs()
		allPasswords := file.DecryptAllPasswords(secretKey)
		for i, password := range allPasswords {
			fmt.Println(cores.Color(cores.Yellow, dateList[i]+" "+timeList[i]+" -"), cores.Color(cores.Cyan, password))
		}
		println()
	},
}

func desencriptar(hashPassword, key []byte) ([]byte, error) {

	ciphertext, err := Decode(hashPassword)
	if err != nil {
		return nil, err
	}

	block, err := aes.NewCipher(key)
	if err != nil {
		return nil, err
	}

	if !isEncoded(ciphertext) {
		return nil, fmt.Errorf("ciphertext is not encoded")
	}

	iv := ciphertext[:aes.BlockSize]
	ciphertext = ciphertext[aes.BlockSize:]

	stream := cipher.NewCFBDecrypter(block, iv)

	stream.XORKeyStream(ciphertext, ciphertext)

	return ciphertext, nil
}

func isEncoded(ciphertext []byte) bool {
	return len(ciphertext) >= aes.BlockSize
}

func init() {
	DecryptCmd.Flags().StringVarP(&secretKey, "key", "k", "", "Chave secreta para desencriptar a senha")
	DecryptCmd.Flags().StringVarP(&FilePath, "file", "f", "senhas.txt", "Arquivo que contém as senhas encriptadas")
}
