package paras

import (
	"log"
	U "utils"

	V "github.com/asaskevich/govalidator"
)

// 一个模板参数的规则结构
type Para struct {
	Label      string                 `json:"label"`
	Name       string                 `json:"name"`
	Type       string                 `json:"type"`
	Desc       string                 `json:"description"`
	Optional   bool                   `json:"optional,omitempty"`
	EnumValues map[string]interface{} `json:"enum_values,omitempty"`
	Default    interface{}            `json:"default,omitempty"`
}

type Paras []Para

func (paras *Paras) CheckVals_(vals map[string]interface{}) {
	for _, para := range *paras {

		name := para.Name
		v := vals[name]
		if v == nil {
			if para.Optional {
				continue // 可选值
			} else {
				log.Panicf("miss para: %s", name)
			}

		} else {
			sv := U.ToStr(v)
			log.Printf("%s : %s", name, sv)

			switch para.Type {
			case "int":
				if !V.IsInt(sv) {
					log.Panicf("para '%s' is not int", name)
				}
			case "email":
				if !V.IsEmail(sv) {
					log.Panicf("para '%s' is not email", name)
				}
			case "string":
			// TODO: 对enum类型没有校验啊
			default:
			}
		}
	}
}
