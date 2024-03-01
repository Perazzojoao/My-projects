package generate

import (
	"fmt"
	"os"
	"time"
)

func SalvarSenha(senha string) {
	if encriptar {
		var err error
		senha, err = Encrypt(senha)
		if err != nil {
			fmt.Println(cores.Color(cores.Red, err.Error()))
			return
		}
	}
	file, err := os.OpenFile("senhas.txt", os.O_WRONLY|os.O_CREATE|os.O_APPEND, 0644)
	if err != nil {
		fmt.Println(cores.Color(cores.Red, err.Error()))
		return
	}
	defer file.Close()

	_, err = file.WriteString(time.Now().Format("2006-01-02 15:04:05") + " " + nome + ": " + senha + "\n")
	if err != nil {
		fmt.Println(cores.Color(cores.Red, err.Error()))
		return
	}

	if encriptar {
		fmt.Println(cores.Yellow + "Senha encriptada e salva no arquivo senhas.txt" + cores.Reset)
		return
	}
	fmt.Println(cores.Yellow + "Senha salva no arquivo senhas.txt" + cores.Reset)
}
