package decrypt

import (
	"bufio"
	"fmt"
	"os"
	"strings"
	"sync"

)

type fullFile struct {
	Path          string
	HashPasswords []string
	Lines         []string
}

func ReadFile(filePath string) (*fullFile, error) {
	file, err := os.Open(filePath)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	lines := []string{}
	for scanner.Scan() {
		lines = append(lines, scanner.Text())
	}

	if err := scanner.Err(); err != nil {
		return nil, err
	}

	fileStruct := &fullFile{
		Path:          filePath,
		HashPasswords: getAllHashes(lines),
		Lines:         lines,
	}

	return fileStruct, nil
}

func getHash(line string) string {
	arguments := strings.Split(line, " ")
	qtd := len(arguments)
	return arguments[qtd-1]
}

func getAllHashes(lines []string) []string {
	hashes := make([]string, len(lines))

	mx := sync.Mutex{}
	wg := sync.WaitGroup{}
	wg.Add(len(lines))
	for i, line := range lines {
		go func() {
			mx.Lock()
			hashes[i] = getHash(line)
			mx.Unlock()
			wg.Done()
		}()
	}
	wg.Wait()
	return hashes
}

func getTimeLog(line string) (string, string) {
	arguments := strings.Split(line, " ")
	date := arguments[0]
	time := arguments[1]
	return date, time
}

func (f *fullFile) DecryptAllPasswords(key string) []string {
	decryptedPasswords := make([]string, len(f.HashPasswords))

	for i, hash := range f.HashPasswords {
		if !isEncoded([]byte(hash)) {
			decryptedPasswords[i] = hash
			continue
		}

		decrypted, err := desencriptar([]byte(hash), []byte(key))
		if err != nil {
			fmt.Println(cores.Color(cores.Red, err.Error()))
			return nil
		}
		decryptedPasswords[i] = string(decrypted)
	}
	return decryptedPasswords
}

func (f *fullFile) GetTimeLogs() ([]string, []string) {
	dateList := make([]string, len(f.Lines))
	timeList := make([]string, len(f.Lines))
	for i, line := range f.Lines {
		date, time := getTimeLog(line)
		dateList[i] = date
		timeList[i] = time
	}
	return dateList, timeList
}
