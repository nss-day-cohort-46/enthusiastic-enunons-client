import React, { useEffect, useContext } from "react"
import { PostContext } from "./PostProvider"
import { useHistory, Link } from "react-router-dom"
import "./Post.css"

export const PostList = (props) => {
    const { posts, getPosts } = useContext(PostContext)
    const history = useHistory()
    
    useEffect(() => {
        getPosts()
        // .then(getCategories)
    }, []);
    
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
                    </section>
                })
            }
            </div>
        </article>
    </>
    )
}