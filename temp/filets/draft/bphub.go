package main

import (
	"log"
	"net/http"
	H "utils/http"
	Mysql "utils/mysql"
	J "utils/json"

	kingpin "gopkg.in/alecthomas/kingpin.v2"

	"github.com/julienschmidt/httprouter"
)

var (
	// 服务端口
	addr  = kingpin.Flag("addr", "server address").Short('p').Default(":8080").String()
	mysql = kingpin.Flag("mysql", "mysql addr").Short('d').Default("10.10.12.2:3306").TCP()
)

var db *Mysql.DB

// 获取蓝图模板
func templates(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {

	// 传入参数
	var q struct {
	}

	// 返回
	var ret struct {
		Err
		Data interface{} `json:"data"`
	}

	H.JsonDo(w, r, &q, &ret, func() {
		res := db.Query("select c_id, c_name from v_bp4biz where user is null")
		ret.Data = res
	})
}

// 获取输入参数
func input(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {

	// 传入参数
	var q struct {
		CId Bp `valid:"-"`
	}

	// 返回
	var ret struct {
		Err
		Data interface{} `json:"data"`
	}

	H.JsonDo(w, r, &q, &ret, func() {
		// 只取yaml
		// bp := db.QryValue("select yaml from v_bp4biz where c_id = ? ", q.CId)

		// var obj map[string]interface{}

		// // 解析yaml
		// yaml.Unmarshal([]byte(bp.(string)), &obj)

		// input := obj["input"]

		ret.Data = q.CId.get_paras()

	})
}

// 检查输入参数
func check_input(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {

	// 传入参数
	var q struct {
		CId    Bp     `valid:"-"`
		Values string `valid:"json"`
	}

	// 返回
	var ret struct {
		Err
	}

	H.JsonDo(w, r, &q, &ret, func() {
		// 获取到参数
		paras := q.CId.get_paras()
		// log.Printf("paras: %+v", paras)

		// 取到values
		var vals map[string]interface{}
		J.StrTo(q.Values, &vals)

		// 检验参数
		paras.CheckVals_(vals)
	})

}

// 获取buildpack
func buildpack(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {

	// 传入参数
	var q struct {
		CId    Bp     `valid:"-"`
	}

	// 返回
	var ret struct {
		Err
		Data interface{} `json:"data"`
	}

	H.JsonDo(w, r, &q, &ret, func() {
		ret.Data = q.CId.get_bpks()
	})

}

// 保存蓝图
func save_bp(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	// 传入参数
	var q struct {
		Id   int    `valid:"-"`
		Topo string `valid:"-"`
		Yaml string `valid:"-"`
		User string `valid:"-"`
		Name string `valid:"-"`
	}

	// 返回
	var ret struct {
		Err
		Data interface{} `json:"data"`
	}

	H.JsonDo(w, r, &q, &ret, func() {
		// 保存蓝图
		// 如果有id，则更新，每一项都更新

		var id int64 = int64(q.Id)
		if id == 0 {
			id = db.Insert("blueprint", q)
		} else { // 如果没有id，则插入，生成一个新的id
			db.Update("blueprint", q, "Id")
		}

		ret.Data = map[string]interface{}{
			"bp_id": id,
		}

	})

}

func init() {
	kingpin.Parse()
	db = Mysql.Open_("mysql", "blueprint:ctg123@tcp("+(*mysql).String()+")/blueprint?charset=utf8")
}

func main() {

	router := httprouter.New()
	router.POST("/save_bp", save_bp)
	router.GET("/templates", templates)
	router.GET("/input", input)
	router.GET("/check_input", check_input)
	router.NotFound = http.FileServer(http.Dir("build"))

	log.Fatal(http.ListenAndServe(*addr, router))
}
