import React, { useState, createContext } from "react"

export const PostContext = createContext()

export const PostProvider = (props) => {
    const [posts, setPosts] = useState([])
    const [post, setPost] = useState({})
    
    const getPosts = () => {
    
        return fetch("http://localhost:8000/posts", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
            .then(response => response.json())
            .then(setPosts)
        }

    const getPostById = (id) => {
        return fetch(`http://localhost:8000/posts/${id}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`,
            }})
                .then(response => response.json())
    }

    const createPost = postObj => {
        return fetch("http://localhost:8000/posts", {
            method: "POST",
            headers:{
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        })
            .then(getPosts)
    }

    const updatePost = post => {
        return fetch(`http://localhost:8000/posts/${post.id}`, {
        method: "PUT",
        headers:{
            "Authorization": `Token ${localStorage.getItem("rare_user_id")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    })
        .then(getPosts)
    }

    const deletePost = postId => {
        return fetch(`http://localhost:8000/posts/${ postId }/detail`, {
            method: "DELETE",
            headers:{
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
            .then(getPosts)
    }

    return (
        <PostContext.Provider value={{ posts, setPost, getPosts, getPostById,
            createPost, updatePost, deletePost }}>
            {props.children}
        </PostContext.Provider>
    )
}