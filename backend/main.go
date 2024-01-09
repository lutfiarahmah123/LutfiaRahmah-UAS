package main

import (
    "database/sql"
    "encoding/json"
    "fmt"
    "io/ioutil"
    "log"
    "net/http"

    _ "github.com/go-sql-driver/mysql"
    "github.com/gorilla/mux"
)

func main() {
    Routers()
}

func Routers() {
    InitDB()
    defer db.Close()
    log.Println("Starting the HTTP server on port 9080")
    router := mux.NewRouter()
    router.HandleFunc("/users",
        GetUsers).Methods("GET")
    router.HandleFunc("/users",
        CreateUser).Methods("POST")
    router.HandleFunc("/users/{id}",
        GetUser).Methods("GET")
    router.HandleFunc("/users/{id}",
        UpdateUser).Methods("PUT")
    router.HandleFunc("/users/{id}",
        DeleteUser).Methods("DELETE")
    http.ListenAndServe(":9080",
        &CORSRouterDecorator{router})
}


func GetUsers(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    var users []User

    result, err := db.Query("SELECT id," +
        "judul_buku,jumlah,nama_peminjam,alamat_peminjam,noHp_peminjam,tanggal_pinjam,tanggal_pengembalian,lama_pinjam from peminjamanBuku_lutfia")
    if err != nil {
        panic(err.Error())
    }
    defer result.Close()
    for result.Next() {
        var user User
        err := result.Scan(&user.ID, &user.Judul_buku, &user.Jumlah, &user.Nama_peminjam, &user.Alamat_peminjam, &user.NoHp_peminjam, &user.Tanggal_pinjam, &user.Tanggal_pengembalian, &user.Lama_pinjam)

        if err != nil {
            panic(err.Error())
        }
        users = append(users, user)
    }
    json.NewEncoder(w).Encode(users)
}

func CreateUser(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    stmt, err := db.Prepare("INSERT INTO peminjamanBuku_lutfia (judul_buku, jumlah, nama_peminjam, alamat_peminjam, noHp_peminjam, tanggal_pinjam, tanggal_pengembalian, lama_pinjam) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
    if err != nil {
        panic(err.Error())
    }
    body, err := ioutil.ReadAll(r.Body)
    if err != nil {
        panic(err.Error())
    }
    keyVal := make(map[string]string)
    json.Unmarshal(body, &keyVal)
    judul_buku := keyVal["judul_buku"]
    jumlah := keyVal["jumlah"]
    nama_peminjam := keyVal["nama_peminjam"]
    alamat_peminjam := keyVal["alamat_peminjam"]
    noHp_peminjam := keyVal["noHp_peminjam"]
    tanggal_pinjam := keyVal["tanggal_pinjam"]
    tanggal_pengembalian := keyVal["tanggal_pengembalian"]
    lama_pinjam := keyVal["lama_pinjam"]

    _, err = stmt.Exec(judul_buku, jumlah, nama_peminjam, alamat_peminjam, noHp_peminjam, tanggal_pinjam, tanggal_pengembalian, lama_pinjam)
    if err != nil {
        panic(err.Error())
    }
    w.WriteHeader(http.StatusCreated)
    fmt.Fprintf(w, "New user was created successfully")

}

func GetUser(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    params := mux.Vars(r)
    result, err := db.Query("SELECT id,"+
        "judul_buku,jumlah,nama_peminjam,alamat_peminjam,noHp_peminjam,tanggal_pinjam,tanggal_pengembalian,lama_pinjam from peminjamanBuku_lutfia WHERE id = ?", params["id"])
    if err != nil {
        panic(err.Error())
    }
    defer result.Close()
    var user User
    for result.Next() {
        err := result.Scan(&user.ID,
            &user.Judul_buku, &user.Jumlah, &user.Nama_peminjam, &user.Alamat_peminjam, &user.NoHp_peminjam, &user.Tanggal_pinjam, &user.Tanggal_pengembalian, &user.Lama_pinjam)

        if err != nil {
            panic(err.Error())
        }
    }
    json.NewEncoder(w).Encode(user)
}

func UpdateUser(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    params := mux.Vars(r)
    stmt, err := db.Prepare("UPDATE peminjamanBuku_lutfia SET judul_buku=?, jumlah=?, nama_peminjam=?, alamat_peminjam=?, noHp_peminjam=?, tanggal_pinjam=?, tanggal_pengembalian=?, lama_pinjam=? WHERE id=?")

    if err != nil {
        panic(err.Error())
    }
    body, err := ioutil.ReadAll(r.Body)
    if err != nil {
        panic(err.Error())
    }
    keyVal := make(map[string]string)
    json.Unmarshal(body, &keyVal)
    judul_buku := keyVal["judul_buku"]
    jumlah := keyVal["jumlah"]
    nama_peminjam := keyVal["nama_peminjam"]
    alamat_peminjam := keyVal["alamat_peminjam"]
    noHp_peminjam := keyVal["noHp_peminjam"]
    tanggal_pinjam := keyVal["tanggal_pinjam"]
    tanggal_pengembalian := keyVal["tanggal_pengembalian"]
    lama_pinjam := keyVal["lama_pinjam"]
    _, err = stmt.Exec(judul_buku, jumlah, nama_peminjam, alamat_peminjam, noHp_peminjam, tanggal_pinjam, tanggal_pengembalian, lama_pinjam, params["id"])
    if err != nil {
        panic(err.Error())
    }
    fmt.Fprintf(w, "User with id = %s was updated",
        params["id"])
}

func DeleteUser(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    params := mux.Vars(r)
    // stmt, err := db.Prepare("DELETE FROM users WHERE id = ?")
    stmt, err := db.Prepare("DELETE FROM peminjamanBuku_lutfia WHERE id = ?")
    if err != nil {
        panic(err.Error())
    }
    _, err = stmt.Exec(params["id"])
    if err != nil {
        panic(err.Error())
    }
    fmt.Fprintf(w, "User with id = %s was deleted",
        params["id"])
}

type User struct {
    ID                   string `json:"id"`
    Judul_buku           string `json:"judul_buku"`
    Jumlah               string `json:"jumlah"`
    Nama_peminjam        string `json:"nama_peminjam"`
    Alamat_peminjam      string `json:"alamat_peminjam"`
    NoHp_peminjam        string `json:"noHp_peminjam"`
    Tanggal_pinjam       string `json:"tanggal_pinjam"`
    Tanggal_pengembalian string `json:"tanggal_pengembalian"`
    Lama_pinjam          string `json:"lama_pinjam"`
}

// ... [rest of your code remains unchanged]

var db *sql.DB
var err error

func InitDB() {
    db, err = sql.Open("mysql",
        "root:@tcp(127.0.0.1:3306)/db_2209259_lutfia_uas_pilkomB")
    if err != nil {
        panic(err.Error())
    }
}

/***************************************************/

// CORSRouterDecorator applies CORS headers to a mux.Router
type CORSRouterDecorator struct {
    R *mux.Router
}

func (c *CORSRouterDecorator) ServeHTTP(rw http.ResponseWriter,
    req *http.Request) {
    if origin := req.Header.Get("Origin"); origin != "" {
        rw.Header().Set("Access-Control-Allow-Origin", origin)
        rw.Header().Set("Access-Control-Allow-Methods",
            "POST, GET, OPTIONS, PUT, DELETE")
        rw.Header().Set("Access-Control-Allow-Headers",
            "Accept, Accept-Language,"+
                " Content-Type, YourOwnHeader")
    }
    // Stop here if its Preflighted OPTIONS request
    if req.Method == "OPTIONS" {
        return
    }

    c.R.ServeHTTP(rw, req)
}
