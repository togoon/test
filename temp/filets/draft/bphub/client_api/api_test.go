package client_api

import (
	"testing"
	"log"
)

func Test_getbp(t *testing.T) {
	yaml, level,  err := GetBluePrint("10.10.10.23:8080", "8") // 8为蓝图id
	log.Printf("yaml: %+v, level: %+v, err: %+v", yaml, level, err)
}
