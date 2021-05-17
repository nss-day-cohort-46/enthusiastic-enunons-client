import React, { useEffect, useContext, useState } from "react"
import { PostContext } from "./PostProvider"
import { Post } from "./Post"
import "./Post.css"
import { useHistory } from "react-router-dom"

// this is a list of all the post
export const PostList = (props) => {
    const { posts, getPosts, searchTerms } = useContext(PostContext)
    const [ filteredPosts, setFiltered ] = useState([])
    const history = useHistory()
    
    // Empty dependency array - useEffect only runs after first render
    useEffect(() => {
        getPosts()
    }, []);
    

    
    // useEffect dependency array with dependencies - will run if dependency changes (state)
    // searchTerms will cause a change
    // useEffect(() => {
    //     if (searchTerms !== "") {
    //         // If the search field is not blank, display matching posts
    //         const subset = posts.filter(post => post.title.toLowerCase().includes(searchTerms))
    //         setFiltered(subset)
    //     } else {
    //         // If the search field is blank, display all posts
    //         setFiltered(posts)
    //     }
    //     }, [searchTerms, posts])
    
    return (
    <>
        <h1>My Post</h1>

        <button onClick={() => history.push("/posts/create")}>
            Add Post
        </button>
        
        <div className="posts">
        {
        posts.map(post => {
            return <Post key={post.id} post={post} />
        })
        }
        </div>
    </>
    )
    }