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
        .then(post => {
            setPosts ({
                id: post.id,
                rareUser: post.rare_user,
                title: post.title,
                categoryId: post.category,
                publicationDate: post.publication_date,
                imageUrl: post.image_url,
                content: post.content,
                approved: post.approved
            })
        })
    }, [])
    
    return (
        
        <section key={`post--${post.id}`} className="post">
            <h2 className="post__title">{post.title}</h2>
            <div className="post__publication_date">
                            {
                                new Date(post.publicationDate).toLocaleDateString("en-US",
                                {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })
                            } 
                        </div>
            <img className="post_imageUrl" src={ post.imageUrl }/>
            <div className="post_content">{post.content}</div>

            <button onClick={() => deletePost(post.id).then(() => props.history.push("/posts"))} >Delete Post</button>

            <button onClick={() => {
                props.history.push(`/posts/edit/${postId}`)
            }}>Edit</button>
        </section>
    )
}