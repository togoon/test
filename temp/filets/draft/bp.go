package main
import (
	"github.com/ghodss/yaml"
	U "utils"
)

type Bp int

func (me Bp) get_paras() Paras {

	// 只取yaml
	bp := db.QryValue("select yaml from v_bp4biz where c_id = ? ", me)

	var obj map[string]interface{}

	// 解析yaml
	yaml.Unmarshal([]byte(bp.(string)), &obj)

	input := obj["input"]

	var paras Paras
	U.Conv(input, &paras)

	return paras
}
