package main

import (
	"log"
	"net/http"
	H "utils/http"
	Mysql "utils/mysql"
	kingpin "gopkg.in/alecthomas/kingpin.v2"

	"github.com/julienschmidt/httprouter"
)

var (
	// 服务端口
	addr  = kingpin.Flag("addr", "server address").Short('p').Default(":8080").String()
	mysql = kingpin.Flag("mysql", "mysql addr").Short('d').Default("10.10.12.2:3306").TCP()
)

var db *Mysql.DB


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

		/*
		var id int64 = int64(q.Id)
		if id == 0 {
			id = db.Insert("template", q)
		} else { // 如果没有id，则插入，生成一个新的id
			db.Update("template", q, "id")
		}

		ret.Data = map[string]interface{}{
			"bp_id" : id,
		}
		*/

		i := db.Exec("show tables")
		ret.Data = map[string]interface{}{
			"bp_id" : i,
		}
	})
}

func init()  {
	kingpin.Parse()
	db = Mysql.Open_("mysql", "blueprint:ctg123@tcp(" + (*mysql).String() + ")/blueprint?charset=utf8")
}

func main() {

	router := httprouter.New()
	router.POST("/save_bp", save_bp)
	router.NotFound = http.FileServer(http.Dir("build"))

	log.Fatal(http.ListenAndServe(*addr, router))
}
