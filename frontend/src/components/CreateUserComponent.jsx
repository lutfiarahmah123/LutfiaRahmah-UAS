import React, { Component } from "react";
import UserService from "../services/UserService";
import './styles.css';
import Swal from "sweetalert2"
class CreateUserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
      id: this.props.match.params.id,
      judul_buku: "",
      jumlah: "",
      nama_peminjam: "",
      alamat_peminjam: "",
      noHp_peminjam: "",
      tanggal_pinjam: "",
      tanggal_pengembalian: "",
      lama_pinjam: "",
    };
    this.changejudul_buku= this.changejudul_buku.bind(this);
    this.changejumlah = this.changejumlah.bind(this);
    this.changenama_peminjam = this.changenama_peminjam.bind(this);
    this.changealamat_peminjam = this.changealamat_peminjam.bind(this);
    this.changenoHp_peminjam = this.changenoHp_peminjam.bind(this);
    this.changetanggal_pinjam = this.changetanggal_pinjam.bind(this);
    this.changetanggal_pengembalian = this.changetanggal_pengembalian.bind(this);
    this.changelama_pinjam = this.changelama_pinjam.bind(this);
    this.saveOrUpdateUser = this.saveOrUpdateUser.bind(this);
  }

  
  componentDidMount() {
    
    if (this.state.id === "_add") {
      return;
    } else {
      UserService.getUserById(this.state.id).then((res) => {
        let user = res.data;
        this.setState({
          judul_buku: user.judul_buku,
            jumlah: user.jumlah,
            nama_peminjam: user.nama_peminjam,
            alamat_peminjam: user.alamat_peminjam,
            noHp_peminjam: user.noHp_peminjam,
            tanggal_pinjam: user.tanggal_pinjam,
            tanggal_pengembalian: user.tanggal_pengembalian,
            lama_pinjam: user.lama_pinjam,
        });
      });
    }
  }
  saveOrUpdateUser = (e) => {
    e.preventDefault();
    let user = {
        judul_buku: this.state.judul_buku,
        jumlah: this.state.jumlah,
        nama_peminjam: this.state.nama_peminjam,
        alamat_peminjam: this.state.alamat_peminjam,
        noHp_peminjam: this.state.noHp_peminjam,
        tanggal_pinjam: this.state.tanggal_pinjam,
        tanggal_pengembalian: this.state.tanggal_pengembalian,
        lama_pinjam: this.state.lama_pinjam,
    };

    console.log("user => " + JSON.stringify(user));
    
     if (this.state.id === "_add") {
    UserService.createUser(user).then((res) => {
      Swal.fire({
        title: "Selamat!",
        text: "Anda berhasil menambahkan data pengguna!",
        icon: "success"
      });
      this.props.history.push("/users");
    });
  } else {
    UserService.updateUser(user, this.state.id).then((res) => {
      Swal.fire({
        title: "Selamat!",
        text: "Anda berhasil memperbarui data pengguna!",
        icon: "success"
      });
      this.props.history.push("/users");
    });
  }
};

  changejudul_buku = (event) => {
    this.setState({ judul_buku: event.target.value });
  };

  changejumlah = (event) => {
    this.setState({ jumlah: event.target.value });
  };

  changenama_peminjam = (event) => {
    this.setState({ nama_peminjam: event.target.value });
  };

  changealamat_peminjam = (event) => {
    this.setState({ alamat_peminjam: event.target.value });
  };

  changenoHp_peminjam = (event) => {
    console.log(event.target.value);
    this.setState({ noHp_peminjam: event.target.value });
  };

  changetanggal_pinjam = (event) => {
    this.setState({ tanggal_pinjam: event.target.value });
  };

  changetanggal_pengembalian = (event) => {
    console.log(event.target.value);
    this.setState({ tanggal_pengembalian: event.target.value });
  };

  changelama_pinjam = (event) => {
    this.setState({ lama_pinjam: event.target.value });
  };

  cancel() {
    this.props.history.push("/users");
  }

  getTitle() {
    if (this.state.id === "_add") {
      return <h3 className="text-center">Peminjam Baru</h3>;
    } else {
      return <h3 className="bru text-center">Ubah Data Peminjam</h3>;
    }
  }
  
  render() {
    return (
      <div>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3" style={{backgroundColor: '#2c3e50' }}>
              {this.getTitle()}
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label>Judul Buku: </label>
                    <input
                      placeholder="Judul Buku"
                      name="judul buku"
                      className="form-control"
                      value={this.state.judul_buku}
                      onChange={this.changejudul_buku}
                    />
                  </div>
                  <div className="form-group">
                    <label>Jumlah: </label>
                    <input
                      type="number"
                      placeholder="Jumlah"
                      name="jumlah"
                      className="form-control"
                      value={this.state.jumlah}
                      onChange={this.changejumlah}
                    />
                  </div>
                  <div className="form-group">
                    <label>Nama Peminjam: </label>
                    <input
                      placeholder="Nama Peminjam"
                      name="nama_peminjam"
                      className="form-control"
                      value={this.state.nama_peminjam}
                      onChange={this.changenama_peminjam}
                    />
                  </div>
                  <div className="form-group">
                    <label>Alamat Peminjam: </label>
                    <input
                      placeholder="Alamat Peminjam"
                      name="alamat_peminjam"
                      className="form-control"
                      value={this.state.alamat_peminjam}
                      onChange={this.changealamat_peminjam}
                    />
                  </div>
                  <div className="form-group">
                    <label>No. HP Peminjam: </label>
                    <input
                      placeholder="No. HP"
                      name="noHp_peminjam"
                      className="form-control"
                      value={this.state.noHp_peminjam}
                      onChange={this.changenoHp_peminjam}
                    />
                  </div>
                  <div className="form-group">
                    <label>Tanggal Pinjam: </label>
                    <input
                      type="date"
                      placeholder="Tanggal Pinjam"
                      name="tanggal_pinjam"
                      className="form-control"
                      value={this.state.tanggal_pinjam}
                      onChange={this.changetanggal_pinjam}
                    />
                  </div>
                  <div className="form-group">
                    <label>Tanggal Pengembalian: </label>
                    <input
                      type="date"
                      placeholder="Tanggal Pengembalian"
                      name="tanggal_pengembalian"
                      className="form-control"
                      value={this.state.tanggal_pengembalian}
                      onChange={this.changetanggal_pengembalian}
                    />
                  </div>
                  <div className="form-group">
                    <label>Lama Pinjam: </label>
                    <input
                      placeholder="Lama Pinjam"
                      name="lama_pinjam"
                      className="form-control"
                      value={this.state.lama_pinjam}
                      onChange={this.changelama_pinjam}
                    />
                  </div>
                  <button
                    className="btn btn-success"
                    onClick={this.saveOrUpdateUser}
                  >
                    Simpan
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    Batal
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
}

export default CreateUserComponent;

