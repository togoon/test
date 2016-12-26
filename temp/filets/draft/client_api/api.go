package client_api

import (
	"io/ioutil"
	"net/http"
	"net/url"
	"encoding/json"
	"fmt"
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

	if data, ok := res["data"].(map[string]interface{}); ok {
		if iyaml, ok := data["yaml"].(string); ok {
			yaml = iyaml
		} else {
			err = fmt.Errorf("get yaml error")
			return
		}

		if flevel, ok := data["level"].(float64); ok {
			level = int(flevel)
		} else {
			err = fmt.Errorf("get level error")
			return
		}

	} else {
		err = fmt.Errorf("get data error")
		return
	}


	return
}

