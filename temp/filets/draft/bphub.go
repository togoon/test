package main

import (
	"log"
	"net/http"
	H "utils/http"

	"github.com/julienschmidt/httprouter"
)

// 保存蓝图
func save_bp(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	// 传入参数
	var q struct {
		Id   int    `valid:"-"`
		// Topo string `valid:"json"`
		Yaml string `valid:"-"`
	}

	// 返回
	var ret struct {
		Err
		Data interface{} `json:"data"`
	}

	H.JsonDo(w, r, &q, &ret, func() {
		ret.Data = map[string]interface{}{
			"bp_id" : 888,
		}
	})
}

func NewFunc(w http.ResponseWriter, r *http.Request) {

}

func main() {
	router := httprouter.New()
	router.POST("/save_bp", save_bp)
	router.NotFound = http.FileServer(http.Dir("build"))

	log.Fatal(http.ListenAndServe(":8080", router))
}
