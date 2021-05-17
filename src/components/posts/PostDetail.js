import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "./PostProvider"
import "./Post.css"
import { useParams, useHistory } from "react-router-dom"
// import { Link } from "react-router-dom"

export const PostDetail = (props) => {
    console.log(props)
    const { post, getPostById } = useContext(PostContext)
    const { updatePost, deletePost } = useContext(PostContext)




    const {postId} = useParams();
    const history = useHistory();

    useEffect(() => {
        console.log("useEffect", postId)
        getPostById(postId)
    }, [])
    
    return (
        
        <section className="post">
        <h3 className="post_title">{post.title}</h3>
        <div className="post_publication_date">Published: {post.publication_date}</div>

        <a className="post_image_url" href={ post.image_url } target="_blank">{ post.image_url }</a>
        <div className="post_content">Content: {post.content}</div>
        <button onClick={() => deletePost(post.id).then(() => props.history.push("/posts"))} >Delete Post</button>

            <button onClick={() => {
                props.history.push(`/posts/edit/${postId}`)
            }}>Edit</button>
        </section>
    )
}