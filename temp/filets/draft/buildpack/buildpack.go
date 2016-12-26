package buildpack

import (
)

// 一个模板参数的规则结构
type BuildPack struct {
	Id      string                 `json:"bp_id"` // buildpack模块对应蓝图的id
	InputName       string                 `json:"input_name"` // buildpack到目标蓝图的哪个输入
	CodeRepo       string                 `json:"code_repo"`
	ImageName       string                 `json:"image_name"`
	// 其他的后面再补充
}

type BuildPacks []BuildPack

