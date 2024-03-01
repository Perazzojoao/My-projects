package decrypt

import "encoding/base64"

func Decode(encodedString []byte) ([]byte, error) {
	data, err := base64.StdEncoding.DecodeString(string(encodedString))
	if err != nil {
		return nil, err
	}
	return data, nil
}
