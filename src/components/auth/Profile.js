import React, { useEffect, useContext, useState } from "react"
import { UserContext } from "../users/UserProvider"
import { HumanDate } from "../utils/HumanDate.js"
import { useParams } from "react-router-dom"
import "./Profile.css"

export const UserProfile = (ß) => {
    const { getUserById } = useContext(UserContext)

    const [user, setUser] = useState({})

    const { userId } = useParams();

    useEffect(() => {
        getUserById(userId)
          .then((response) => {
            setUser(response)
          })
      }, [])

    return (
        <article className="profile">
            <header>
                <h1>Your Profile</h1>
            </header>
            <section className="profile__info">
                <header className="profile__header">
                    <h3>Your Info</h3>
                </header>
                <div className="profile__name">
                    Welcome: {user.first_name} {user.last_name}
                </div>
                {user.profile_image_url ? <img src="{user.profile_image_url}" alt="user's profile image"/> : <img src="./images/default-profile-image.png" alt="default profile image"/> }
                <div className="profile__username">Email: {user.email}</div>
                <div className="profile__bio">About you: {user.bio}</div>
                {/* <div className="user__created_on">Rare User Since: <HumanDate date={user.created_on}></HumanDate></div> */}
            </section>
        </article>
    )
}