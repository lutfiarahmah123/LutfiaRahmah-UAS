import React, { Component } from "react";
import UserService from "../services/UserService";
import './styles.css';

class ViewUserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      user: {},
    };
  }

  componentDidMount() {
    UserService.getUserById(this.state.id).then((res) => {
      this.setState({ user: res.data });
    });
  }

  render() {
    return (
      <div>
        <br></br>
        <div className="card col">
          <h3 className="text-center">Detail Pinjaman</h3>
          <div className="card-body">
            <div className="row">
              <label> judul buku: </label>
              <div> {this.state.user.judul_buku}</div>
            </div>
            <div className="row">
              <label> jumlah: </label>
              <div> {this.state.user.jumlah}</div>
            </div>
            <div className="row">
              <label> nama peminjam: </label>
              <div> {this.state.user.nama_peminjam}</div>
            </div>
            <div className="row">
              <label> alamat peminjam:  </label>
              <div> {this.state.user.alamat_peminjam}</div>
            </div>
            <div className="row">
              <label> noHp peminjam:  </label>
              <div> {this.state.user.noHp_peminjam}</div>
            </div>
            <div className="row">
              <label> tanggal pinjam:  </label>
              <div> {this.state.user.tanggal_pinjam}</div>
            </div>
            <div className="row">
              <label> tanggal pengembalian:  </label>
              <div> {this.state.user.tanggal_pengembalian}</div>
            </div>
            <div className="row">
              <label> lama pinjam:  </label>
              <div> {this.state.user.lama_pinjam}</div>
            </div>
          </div>
        </div>
      </div>
      
    );
  }
}

export default ViewUserComponent;

