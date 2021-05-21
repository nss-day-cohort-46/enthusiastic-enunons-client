import React, { useContext, useState, useEffect } from "react"
import { CommentContext } from "./CommentProvider.js"
// import { PostContext } from "../post/PostProvider"
import { useHistory, useParams } from 'react-router-dom'


export const CommentForm = () => {
    const history = useHistory()
    const { comment , getComments, createComment, getCommentById, updateComment } = useContext(CommentContext)
    const {commentId} = useParams()
    console.log(commentId)

    // const [isLoading, setIsLoading] = useState(true);


    /*
        setting default values of input fields
    */
    const [currentComment, setCurrentComment] = useState({
        postId: 0,
        content: ""
    })

    useEffect(() => {
        getComments()
    }, [])

    useEffect(() => {
        if (commentId) {
            getCommentById(commentId)
            .then(comment => {
                setCurrentComment(comment)
                // setIsLoading(false)
            })
        } 
        // else {
        //     setIsLoading(false)
        // }
    }, [])

    const handleControlledInputChange = (event) => {
        const newCommentState = { ...currentComment }
        newCommentState[event.target.id] = event.target.value
        setCurrentComment(newCommentState)
    }

        //handle save function
        // const handleSaveUpdatedComment = (event) => {
        //     //Prevents the browser from submitting the form
        //     event.preventDefault()
        //     //create a new Comment then move to comment details
        //     createComment(comment)
        // }

    return (
            <form className="commentForm">
                {/* <h2 className="commentForm__title">{postId ? "Add Comment":"Edit Comment"}</h2> */}
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="content">Text: </label>
                        <input type="text" id="content" required autoFocus className="form-control" placeholder="Comment text"
                            value={currentComment.content}
                            onChange={handleControlledInputChange}
                        />
                    </div>
                </fieldset>

            <button type="submit" 
            // disabled={isLoading}

                onClick={evt => {
                    // Prevent form from being submitted
                    // evt.preventDefault()
                    // handleSaveUpdatedComment()

                    const comment = {
                        id: currentComment.id,
                        postId: currentComment.post,
                        content: currentComment.content,
                    }

                    updateComment(comment)
                    .then(() => history.push("/posts"))
                }}
            
            className="btn btn-primary">
                {commentId ? "Save Comment" : "Add New Comment"}
            </button>

        {/* <button type="submit" className="btn btn-primary" disabled={isLoading} onChange={event => {
                        event.preventDefault()
                        handleSaveUpdatedComment()
                    }}>
                    {commentId ? "Save Comment!" : "Add New Comment"}
        </button>  */}
        {commentId ? 
            <button className="btn btn-cancel"
                onClick={() => { history.push("/comments") }}>
                    Cancel
            </button> : ""
        }
    </form> 
    )
}