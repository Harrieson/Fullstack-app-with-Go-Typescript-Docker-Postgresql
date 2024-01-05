package main

import (
	"database/sql"
	"log"
	"os"

	"github.com/gorilla/mux"
)

type User struct {
	Id    int    `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
}

func main() {
	// Connect to database

	db, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// Create the table now!

	_, err = db.Exec("CREATE TABLE IF NOT EXISTS users ( id SERIAL PRIMARY KEY, name TEXT, email TEXT)")
	if err != nil {
		log.Fatal(err)
	}

	// Create Router for all API paths.

	router := mux.NewRouter()
	router.HandleFunc("/api/go/users", getUsers(db)).Methods("GET")
	router.HandleFunc("api/go/users/{id}", getUser(db)).Methods("GET")
	router.HandleFunc("api/go/users", createUser(db)).Methods("POST")
	router.HandleFunc("api/go/users/{id}", updateUser(db)).Methods("PUT")
	router.HandleFunc("api/go/users/{id}", deleteUser(db)).Methods("DELETE")
}
