import React, { useContext, useState, useEffect } from "react"
import { PostList } from "./PostList";
import { HumanDate } from "../utils/HumanDate"
import { PostContext } from "./PostProvider"
import { CategoryContext } from "../categories/CategoryProvider"
export const PostForm = (props) => {
    
    const { addPost, updatePost, post, setPost, getPosts } = useContext(PostContext)
    const { categories, getCategories } = useContext(CategoryContext)
    const [editMode, editModeChanged] = useState(false);
    useEffect(() => {
    
        getPosts()
        getCategories()
    }, [])


    useEffect(() => {
        if ('id' in post) {
            editModeChanged(true)
        }
        else {
            editModeChanged(false)
        }
    }, [post])

    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newPost = Object.assign({}, post)
        newPost[event.target.name] = event.target.value
        setPost(newPost)
    }



    const constructNewPost = () => {
        if (editMode) {
            updatePost({
                id: post.id,
                userId: parseInt(localStorage.getItem("rare_user_id")),
                categoryId: parseInt(post.categoryId),
                title: post.title,
                publicationDate: post.publicationDate,
                imageUrl: post.imageUrl,
                content: post.content
            })
        } else {
            // const dateObj = new Date.now()
            debugger
            addPost({
                userId: parseInt(localStorage.getItem("rare_user_id")),
                categoryId: parseInt(post.categoryId),
                title: post.title,
                publicationDate: HumanDate(),
                imageUrl: post.imageUrl,
                content: post.content
            })
            // .then(() => history.push("/posts"))
        }
        setPost({ title: "", imageUrl: "", content: ""})
    }
    
    return (
        <form className="postForm" action="/action_page.php">
            <h2 className="postForm__title">{editMode ? "Update Post" : "Create Post"}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Todays Journal Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        proptype="varchar"
                        placeholder="title"
                        value={post.title}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="content">Todays Journal content: </label>
                    <input type="text" name="content" required autoFocus className="form-control"
                        proptype="varchar"
                        placeholder="content"
                        value={post.content}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="categoryId">Category: </label>
                    <select name="categoryId" className="form-control"
                        value={post.categoryId}
                        onChange={handleControlledInputChange}>

                        <option value="0">Select a Category</option>
                        {
                        categories.map(c => (
                            
                            <option key={c.id} value={c.id}>
                                {c.label}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>



            <fieldset>
                <div className="form-group">
                    <label htmlFor="imageUrl">Upload an Image </label>
                    <input type="text" name="imageUrl" required className="form-control"
                        proptype="varchar"
                        placeholder="imageUrl"
                        value={post.imageUrl}
                        onChange={handleControlledInputChange}
                    />
                    <input type="file" id="myFile" name="filename"/>
                    <input type="submit"></input>
                </div>
            </fieldset>

         <div>
                <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructNewPost()
                }}
                className="btn btn-primary">
                {editMode ? "Update" : "Save"}
            </button>
            </div>
        </form>
    )
}