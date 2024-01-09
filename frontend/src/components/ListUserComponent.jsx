import React, { Component } from 'react'
import UserService from '../services/UserService'
import './styles.css';
import Swal from "sweetalert2"

class ListUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users: [],
            searchTerm: ''
        }

        this.addUser = this.addUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    deleteUser(id) {
        Swal.fire({
            title: 'Apakah Anda yakin ingin menghapus pengguna ini?',
            text: 'Tindakan ini akan menghapus pengguna secara permanen. Anda tidak dapat mengembalikannya.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Hapus',
            cancelButtonText: 'Batal',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                UserService.deleteUser(id).then(res => {
                    this.setState({
                        users: this.state.users.filter(user => user.id !== id)
                    });
                    Swal.fire(
                        'Terhapus!',
                        'Pengguna telah dihapus.',
                        'success'
                    );
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Dibatalkan',
                    'Penghapusan pengguna dibatalkan :)',
                    'error'
                );
            }
        });
    }
    
    SearchChange = (event) => {
        this.setState({ searchTerm: event.target.value });
    }
    
    viewUser(id){
        this.props.history.push(`/view-user/${id}`);
    }

    editUser(id){
        this.props.history.push(`/add-user/${id}`);
    }

    componentDidMount(){
        UserService.getUsers().then((res) => {
            if(res.data == null) {
                this.props.history.push('/add-user/_add');
            }
            this.setState({ users: res.data });
        });
    }

    addUser(){
        this.props.history.push('/add-user/_add');
    }

    render() {
        const filteredUsers = this.state.users.filter(user => 
            user.judul_buku.toLowerCase().includes(this.state.searchTerm.toLowerCase()) || 
            user.nama_peminjam.toLowerCase().includes(this.state.searchTerm.toLowerCase())
        );

        return (
            <div className="my-custom-class">
            <div>
                <h2 className="text-center">Daftar Peminjaman</h2>
                <div className="row">
                    <div className="col-md-6">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Cari"
                            value={this.state.searchTerm}
                            onChange={this.SearchChange}
                        />
                    </div>
                    <div className="col-md-6">
                        <button className="dd" onClick={this.addUser}>Tambah Peminjaman</button>
                    </div>
                </div>
                <br />
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Judul Buku</th>
                                <th>Jumlah</th>
                                <th>Nama Peminjam</th>
                                <th>Alamat Peminjam</th>
                                <th>No. HP Peminjam</th>
                                <th>Tanggal Pinjam</th>
                                <th>Tanggal Pengembalian</th>
                                <th>Lama Pinjam</th>
                            </tr>
                        </thead>
                    
<tbody>
    {filteredUsers.map(user => 
        <tr key={user.id}>
            <td>{user.judul_buku}</td>
            <td>{user.jumlah}</td>
            <td>{user.nama_peminjam}</td>
            <td>{user.alamat_peminjam}</td>
            <td>{user.noHp_peminjam}</td>
            <td>{user.tanggal_pinjam}</td>
            <td>{user.tanggal_pengembalian}</td>
            <td>{user.lama_pinjam}</td>
            <td className="button-container">
                <button onClick={() => this.editUser(user.id)} className="ubh">Ubah</button>
                <button onClick={() => this.deleteUser(user.id)} className="btn btn-danger">Hapus</button>
                <button onClick={() => this.viewUser(user.id)} className="ubh">Lihat</button>
            </td>
        </tr>
    )}
</tbody>
                    </table>
                </div>
            </div>
            </div>
        )
        
    }
}

export default ListUserComponent;

