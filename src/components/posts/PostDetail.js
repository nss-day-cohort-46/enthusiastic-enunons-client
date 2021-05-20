import React, { useContext, useEffect, useState, useRef } from "react"
import { PostContext } from "./PostProvider"
import { TagContext } from "../tags/TagProvider"
import { useParams, useHistory } from "react-router-dom"
import "./Post.css"

export const PostDetail = (props) => {
    const { posts, getPostById, updatePost, deletePost } = useContext(PostContext)
    const { tags, getTagById } = useContext(TagContext)

    const [post, setPosts] = useState({})

    const { postId } = useParams();
    const history = useHistory();
    const modal = useRef()

    useEffect(() => {
        getPostById(postId)
            .then(post => {
                setPosts({
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

    const handleAddTags = () => {

        modal.current.close()
        history.push(`/posts/edit/${postId}`)
    }

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
            <img className="post_imageUrl" src={post.imageUrl} />
            <div className="post_content">{post.content}</div>
            <button onClick={() => modal.current.showModal()}>Add Tags</button>

            <button onClick={() => deletePost(post.id).then(() => props.history.push("/posts"))} >Delete Post</button>
            <button onClick={() => {
                props.history.push(`/posts/edit/${postId}`)
            }}>Edit</button>

            <dialog className="claimModal" ref={modal}>
                <h3>Choose Tags</h3>
                <label>
                    <input type="checkbox"></input>
                </label>
                <button onClick={handleAddTags}>Add Tags and Close</button>
            </dialog>
        </section>
    )
}