import React, { Component } from 'react'
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return ( 
        < div >
            < header >
            <  nav className = "navbar" >
            <div >
            <a href = "/users" className = "navbar-brand"  style={{ fontSize: '50px' }}  >
            Buku-Ku 
            </a></div >
            </nav>
            </header > 
            </div>
        )
    }
}

export default HeaderComponent
