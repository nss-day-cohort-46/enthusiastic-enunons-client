import React from "react"
import { Link } from "react-router-dom"
import "./User.css"

export const UserCard = ({ user }) => (
    <section className="user">
        <h3><Link className="user__name" to={`/users/profile/${user.id}`}>
          { user.first_name} { user.last_name }
        </Link></h3>
    </section>
)