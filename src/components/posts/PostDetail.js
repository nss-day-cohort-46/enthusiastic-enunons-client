import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "./PostProvider"
import { useParams, useHistory } from "react-router-dom"
import "./Post.css"

export const PostDetail = (props) => {
    const { posts, getPostById, updatePost, deletePost } = useContext(PostContext)

    const [post, setPosts] = useState({})

    const {postId} = useParams();
    const history = useHistory();

    useEffect(() => {
        getPostById(postId)
        
    }, [])
    
    return (
        
        <section key={`post--${post.id}`} className="post">
            <h3 className="post__title">{post.title}</h3>
            <div className="post__publication_date">Published: {post.publication_date}</div>

            <a className="post_image_url" href={ post.image_url } target="_blank">{ post.image_url }</a>
            <div className="post_content">Content: {post.content}</div>

            {/* <div className="post_category">{ 
            categories.map( category => {
                if (category.id == post.category_id) {
                    return categories.label
                }
            }
            )} </div> */}
        
            <div className="post_imageUrl">{ post.imageUrl }</div>



        <button onClick={() => deletePost(post.id).then(() => props.history.push("/posts"))} >Delete Post</button>

            <button onClick={() => {
                props.history.push(`/posts/edit/${postId}`)
            }}>Edit</button>
        </section>
    )
}