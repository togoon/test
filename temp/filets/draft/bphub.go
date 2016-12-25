package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/julienschmidt/httprouter"
)

func Hello(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	fmt.Fprintf(w, "hello")
}

func main() {
	router := httprouter.New()
	router.GET("/hello", Hello)
	router.NotFound = http.FileServer(http.Dir("build"))

	log.Fatal(http.ListenAndServe(":8080", router))
}
