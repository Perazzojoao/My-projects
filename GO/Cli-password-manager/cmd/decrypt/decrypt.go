/*
Copyright © 2024 NAME HERE <EMAIL ADDRESS>
*/
package decrypt

import (
	"crypto/aes"
	"crypto/cipher"
	"fmt"

	"github.com/spf13/cobra"
)

// decryptCmd represents the decrypt command
var DecryptCmd = &cobra.Command{
	Use:   "decrypt",
	Short: "Desencriptar senhas",
	Long:  `Desencripta senhas que foram encriptadas pelo programa. Pode, também, desencripitar senhas alvas em arquivos .txt.`,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("decrypt called")
	},
}

func desencriptar(ciphertext, key []byte) ([]byte, error) {
	block, err := aes.NewCipher(key)
	if err != nil {
		return nil, err
	}

	if len(ciphertext) < aes.BlockSize {
		return nil, fmt.Errorf("ciphertext too short")
	}

	iv := ciphertext[:aes.BlockSize]
	ciphertext = ciphertext[aes.BlockSize:]

	stream := cipher.NewCFBDecrypter(block, iv)

	stream.XORKeyStream(ciphertext, ciphertext)

	return ciphertext, nil
}

func init() {

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// decryptCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// decryptCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
