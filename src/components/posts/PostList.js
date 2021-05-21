import React, { useEffect, useContext, useState } from "react"
import { PostContext } from "./PostProvider"
import { useHistory, Link } from "react-router-dom"
import "./Post.css"
import { CategoryContext } from "../categories/CategoryProvider"

export const PostList = (props) => {
    const { posts, getPosts, getPostSearch, searchTerms } = useContext(PostContext)
    const { categories, getCategories } = useContext(CategoryContext)
    const history = useHistory()

    const [sortedPost, setSortedPosts] = useState([])
    
    useEffect(() => {
        getPosts()
        .then(getCategories)
    }, []);

    useEffect(() => {
        const sortedPost = posts.sort((a, b) =>
            new Date(b.publication_date) - new Date(a.publication_date)
        )
        setSortedPosts(sortedPost)
    }, [posts]);

    useEffect(() => {
        getPostSearch(searchTerms)
    }, [searchTerms])

    
    return (
    <>
        <article className="posts__page">

            <button onClick={() => history.push("/posts/create")}>
                Add Post
            </button>
        
            <h1>My Posts</h1>
            <div className="posts">
            {
                posts.map(post => {
                    return <section key={post.id} post={post} className="post">
                        <img className="post_image_url" src={ post.image_url }/>
                        <h3 className="post__title">
                            <Link to={`/posts/${post.id}`}>
                                {post.title}
                            </Link>
                        </h3>
                            <div>
                            {
                                new Date(post.publication_date).toLocaleDateString("en-US",
                                {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })
                            } 
                        </div>
                        <div>{post.category.label}</div>
                    </section>
                })
            }
            </div>
        </article>
    </>
    )
}