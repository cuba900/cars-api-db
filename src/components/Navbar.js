import React from 'react'
import {Link} from 'react-router-dom'



export const Navbar = () => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-warning">
        {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
        </button> */}
        <div className="navbar-collapse" id="navbarToggler">
            <Link className="navbar-brand" to="/">Lista</Link>
            <ul className="navbar-nav mr-auto mt-1 mt-lg-0">
            <li className="nav-item active">
                <Link className="nav-link" to="/register">Registro <span className="sr-only">(current)</span></Link>
            </li>
            
            <li className="nav-item">
                <Link className="nav-link disabled" to="/" tabIndex={-1} aria-disabled="true">Disabled</Link>
            </li>
            </ul>
            
        </div>
    </nav>

)