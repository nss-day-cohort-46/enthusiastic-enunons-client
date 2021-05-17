import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"
import Logo from "./rare.jpeg"

export const NavBar = () => {
    const history = useHistory()

    return (
        <>
        <div className="header">
            <ul className="navbar">
                <li className="logo">
                    <img className="navbar__logo" src={Logo} />
                    <h2 className="rare__title">Rare Publishing</h2>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/">Home</Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/posts">Posts</Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/users">Users</Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/categories">Categories</Link>
                </li>
                <div className="navbar__item">
                {
                    (localStorage.getItem("rare_user_id") !== null) ?
                        <li className="navbar__item">
                            <button className="nav-link fakeLink navbar__item"
                                onClick={() => {
                                    localStorage.removeItem("rare_user_id")
                                    history.push({ pathname: "/" })
                                }}
                            >Logout</button>
                        </li> :
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>
                        </>
                }
                </div>
            </ul>
            <hr></hr>
        </div>
            </>
    )
}
