package main
// 依赖 db
import (
	"github.com/ghodss/yaml"
	U "utils"
	P "./paras"
)

type Bp int

func (me Bp) get_paras() P.Paras {

	// 只取yaml
	bp := db.QryValue("select yaml from v_bp4biz where c_id = ? ", me)

	var obj map[string]interface{}

	// 解析yaml
	yaml.Unmarshal([]byte(bp.(string)), &obj)

	input := obj["input"]

	var paras P.Paras
	U.Conv(input, &paras)

	return paras
}
