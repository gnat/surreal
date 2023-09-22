package main

import (
	"log"
	"net/http"
	"strconv"
	"strings"
	"text/template"
)

type Person struct {
	Id    int
	Name  string
	Email string
}

func main() {
	people := [4]Person{
		{Id: 0, Name: "Joe Smith", Email: "joe@smith.org"},
		{Id: 1, Name: "Angie McDowell", Email: "angie@macdowell.org"},
		{Id: 2, Name: "Fuqua Tarkenton", Email: "fuqua@tarkenton.org"},
		{Id: 3, Name: "Kim Yee", Email: "kim@yee.org"},
	}

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		parts := strings.Split(r.URL.Path, "/")
		if (len(parts) >= 3) && (parts[1] == "contact") {
			contactID, err := strconv.Atoi(parts[2])
			if (err == nil) && (contactID >= 0) && (contactID < len(people)) {
				if len(parts) == 4 {
					action := parts[3]
					if action == "edit" {
						t := template.Must(template.ParseFiles("edit.html"))
						t.ExecuteTemplate(w, "person", people[contactID])
						return
					}
				}
				if r.Method == "PUT" {
					people[contactID].Name = r.FormValue("name")
					people[contactID].Email = r.FormValue("email")
				}
				t := template.Must(template.ParseFiles("row.html"))
				t.ExecuteTemplate(w, "person", people[contactID])
				return
			}

		}
		t := template.Must(template.ParseFiles("index.html", "row.html"))
		t.Execute(w, people)
	})

	fs := http.FileServer(http.Dir("static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	log.Fatal(http.ListenAndServe(":5432", nil))
}
