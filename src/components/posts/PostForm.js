import React, { useContext, useState, useEffect } from "react"
import { HumanDate } from "../utils/HumanDate"
import { PostContext } from "./PostProvider"
import { CategoryContext } from "../categories/CategoryProvider"
import { useHistory, useParams } from "react-router-dom"

export const PostForm = (props) => {
    
    const { createPost, updatePost, getPostById } = useContext(PostContext)
    const { categories, getCategories } = useContext(CategoryContext)

    const history = useHistory()
    const { postId } = useParams()

    const [post, setPost] = useState({
        title: "",
        categoryId: 0,
        imageUrl: "",
        content: "",
        approved: false,
    })

    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        getCategories()
        if (postId) {
            getPostById(postId)
            .then(post => {
                setPost({
                    id: post.id,
                    rareUserId: post.rare_user,
                    title: post.title,
                    categoryId: post.category.id,
                    publicationDate: post.publication_date,
                    imageUrl: post.image_url,
                    content: post.content,
                    approved: post.approved})
                })
            } else {
            setIsLoading(false)
        }
    }, [])

    const handleControlledInputChange = (event) => {
        const newPost = { ...post }
        newPost[event.target.id] = event.target.value
        setPost(newPost)
    }
    
    const handleSavePost = (event) => {
        event.preventDefault()
        
        if (postId){
            updatePost({
                id: post.id,
                rareUser: post.rareUser,
                title: post.title,
                categoryId: post.categoryId,
                publicationDate: post.publicationDate,
                imageUrl: post.imageUrl,
                content: post.content,
                approved: post.approved
            })
            .then(() => history.push(`/posts`))
          } else {
            
            createPost({
                rareUser: post.rareUser,
                title: post.title,
                categoryId: post.categoryId,
                publicationDate: post.publicationDate,
                imageUrl: post.imageUrl,
                content: post.content,
                approved: post.approved
            })
            .then(() => history.push(`/posts`))
          }
        }
    
    
    return (
        <form className="postForm">
            <h2 className="postForm__title">{postId ? "Update Post" : "Create a Post"}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" id="title" required className="form-control"
                        placeholder="Title of post"
                        value={post.title}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="content">Image URL: </label>
                    <input type="text" id="imageUrl" required className="form-control"
                        placeholder="Image URL"
                        value={post.imageUrl}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="content">Content: </label>
                    <textarea rows = "10" id="content" required className="form-control"
                        placeholder="Article content"
                        value={post.content}
                        onChange={handleControlledInputChange}>
                    </textarea>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="categoryId">Category: </label>
                    <select id="categoryId" required className="form-control"
                        value={post.categoryId}
                        onChange={handleControlledInputChange}>

                        <option value="0">Select a category</option>
                        {
                            categories.map(c => (
                            
                                <option key={c.id} value={c.id}>
                                    {c.label}
                                </option>
                        ))}
                    </select>
                </div>
            </fieldset>

         <div>
            <button type="submit"
                
                onClick={(event) => 
                    handleSavePost(event)
                }
                className="btn btn-primary">
                {postId ? "Update" : "Publish"}
            </button>
        </div>
    </form>
    )
}