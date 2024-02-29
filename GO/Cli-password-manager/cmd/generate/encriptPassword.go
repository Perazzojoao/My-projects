package generate

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/base64"
	"io"

	"github.com/spf13/viper"

)

func Encrypt(stringToEncrypt string) (string, error) {
	plaintext := []byte(stringToEncrypt)
	key := []byte(viper.GetViper().GetString("key"))

	block, err := aes.NewCipher(key)
	if err != nil {
		return "", err
	}

	ciphertext := make([]byte, aes.BlockSize+len(plaintext))
	iv := ciphertext[:aes.BlockSize]
	if _, err := io.ReadFull(rand.Reader, iv); err != nil {
		return "", err
	}

	stream := cipher.NewCFBEncrypter(block, iv)
	stream.XORKeyStream(ciphertext[aes.BlockSize:], plaintext)

	return string(base64.StdEncoding.EncodeToString(ciphertext)), nil
}
