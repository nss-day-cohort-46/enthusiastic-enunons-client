import React, { useState } from "react"

export const CommentContext = React.createContext()

export const CommentProvider = (props) => {
    const [ comments, setComments ] = useState([])

    const getComments = () => {
        return fetch("http://localhost:8000/comments", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
            .then(response => response.json())
            .then(setComments)
    }

    const createComment = (commentObj) => {
        return fetch("http://localhost:8000/comments", {
            method: "POST",
            headers:{
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(commentObj)
        })
            // .then(getComments)
    }

    const getCommentById = (id) => {
        return fetch(`http://localhost:8000/comments/${id}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
            .then(response => response.json())
    }

    const updateComment = comment => {
        return fetch(`http://localhost:8000/comments/${comment.id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comment)
        })
            .then(getComments)
        }
    
    const deleteComment = commentId => {
        return fetch(`http://localhost:8000/comments/${ commentId }`, {
            method: "DELETE",
            headers:{
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
            .then(getComments)
    }    

    return (
        <CommentContext.Provider value={{ comments, getComments, createComment, getCommentById, updateComment, deleteComment }} >
            { props.children }
        </CommentContext.Provider>
    )
}