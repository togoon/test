package main

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
