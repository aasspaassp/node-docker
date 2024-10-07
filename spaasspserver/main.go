package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
)

func main() {
	// Get the current working directory
	cwd, err := os.Getwd()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Current working directory: %s\n", cwd)

	// Directory to serve
	dir := "./dist"
	fmt.Printf("Attempting to serve directory: %s\n", dir)

	// Check if directory exists
	if _, err := os.Stat(dir); os.IsNotExist(err) {
		log.Fatalf("Directory does not exist: %s", dir)
	}

	http.Handle("/spaassp/", http.StripPrefix("/spaassp/", http.FileServer(http.Dir(dir))))

	fmt.Printf("hi to the server on :8080\n")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
