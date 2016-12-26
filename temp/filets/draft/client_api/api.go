package client_api

import (
	"io/ioutil"
	"net/http"
	"net/url"
)

// 根据id获取蓝图id
func GetBluePrint(host string, bpr_id string) (res string, err error) {

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

	res = string(body)
	return
}

