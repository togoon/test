package client_api

import (
	"io/ioutil"
	"net/http"
	"net/url"
	"encoding/json"
)

// 根据id获取蓝图id
func GetBluePrint(host string, bpr_id string) (yaml string, level int, err error) {

	resp, err := http.PostForm("http://" + host + "/get_blueprint", url.Values{
		"bpr_id" : []string{  bpr_id },
	})
	if err != nil {
		return
	}

	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return
	}

	var res map[string]interface{}
	err = json.Unmarshal(body, &res)
	if err != nil {
		return
	}

	data := res["data"].(map[string]interface{})
	yaml = data["yaml"].(string)
	level = int(data["level"].(float64))

	return
}

