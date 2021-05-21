import React, { createContext, useState } from "react"

export const UserContext = createContext()

export const UserProvider = (props) => {
    const [user, setUsers] = useState([])

    const getUsers = () => {
        return fetch("http://localhost:8000/users", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
            .then(response => response.json())
            .then(setUsers)
        }

    const getUserById = (id) => {
        return fetch(`http://localhost:8000/users/${id}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
            .then(response => response.json())
        }

    return (
        <UserContext.Provider value={{ user, getUsers, getUserById }}>
            {props.children}
        </UserContext.Provider>
    )
}