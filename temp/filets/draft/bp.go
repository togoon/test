package main
// 依赖 db
import (
	"github.com/ghodss/yaml"
	U "utils"
	P "./paras"
	bpk "./buildpack"
)

type Bp int

type Bpk bpk.BuildPack
type Bpks bpk.BuildPacks

type Yaml map[string]interface{}

func (me Bp) get_yaml_obj() Yaml {

	bp := db.QryValue("select yaml from v_bp4biz where c_id = ? ", me)

	var obj Yaml

	// 解析yaml
	yaml.Unmarshal([]byte(bp.(string)), &obj)

	return obj
}

func (me Bp) get_paras() P.Paras {

	obj := me.get_yaml_obj()

	input := obj["input"]

	var paras P.Paras
	U.Conv(input, &paras)

	return paras
}

func (me Bp) get_bpks() Bpks {
	return nil
}

