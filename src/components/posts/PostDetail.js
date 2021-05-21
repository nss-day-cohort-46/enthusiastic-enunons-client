import React, { useContext, useEffect, useState, useRef } from "react"
import { PostContext } from "./PostProvider"
import { TagContext } from "../tags/TagProvider"
import { useParams, useHistory } from "react-router-dom"
import "./Post.css"

export const PostDetail = (props) => {
    const { posts, getPostById, updatePost, deletePost } = useContext(PostContext)
    const { tags, getTags } = useContext(TagContext)

    const [post, setPosts] = useState({})
    const [currentTags, setTags] = useState([])

    const { postId } = useParams();
    const history = useHistory();
    const modal = useRef();

    useEffect(() => {
        getTags()
            .then(()
    }, [])

    useEffect(() => {
        getPostById(postId)
            .then(post => {
                setPosts({
                    id: post.id,
                    rareUser: post.rare_user.user.first_name + " " + post.rare_user.user.last_name,
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
            <div className="post_author">By: {post.rareUser}</div>
            <div className="post__publication_date">Published on:&nbsp;
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

            <dialog className="claimModal" ref={modal}>
                <h3>Choose Tags</h3>
                {tags.map(tag => (
                    <div>
                        < label key={tag.id} value={tag.id} > {tag.label}</label>
                        < input type="checkbox" value={ }> {tag.label}</input>
                    </div>
                ))}
                <button onClick={handleAddTags}>Add Tags and Close</button>
            </dialog >

            <button className="submit_button" onClick={() => deletePost(post.id).then(() => history.push("/posts"))}
            >Delete</button>

            <button onClick={() => history.push(`/posts/${postId}/edit`)}
            >Edit</button>
        </section >
    )
}