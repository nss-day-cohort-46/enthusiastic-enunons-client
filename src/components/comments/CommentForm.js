import React, { useContext, useState, useEffect } from "react"
import { CommentContext } from "./CommentProvider.js"
import { useHistory, useParams } from 'react-router-dom'


export const CommentForm = () => {
    const history = useHistory()
    const { getComments, createComment, getCommentById } = useContext(CommentContext)
    const {commentId, postId} = useParams()

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentComment, setCurrentComment] = useState({
        postId: 0,
        author: "",
        content: "",
        createdOn: new Date()
    })

    /*
        Get game types on initialization so that the <select>
        element presents game type choices to the user.
    */

    useEffect(() => {
        getComments()
    }, [])

    const handleControlledInputChange = (event) => {
        const newCommentState = { ...currentComment }
        newCommentState[event.target.id] = event.target.value
        setCurrentComment(newCommentState)
    }


    return (
            <form className="commentForm">
                <h2 className="commentForm__title">{postId ? "Add Comment":"Edit Comment"}</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="content">Text: </label>
                        <input type="text" id="content" required autoFocus className="form-control"
                            value={currentComment.content}
                            onChange={handleControlledInputChange}
                        />
                    </div>
                </fieldset>

            <button type="submit"

                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const comment = {
                        postId: postId,
                        content: currentComment.content,
                        createdOn: currentComment.date
                    }

                    createComment(comment)
                    .then(() => history.push("/posts"))
                }}
            
            className="btn btn-primary">
                {commentId ? "Save":"Add"}
            </button>
    </form> 
    )
}