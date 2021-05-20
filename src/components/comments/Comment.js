import React, {useContext, useEffect, useState} from "react"
import { useHistory, useParams } from 'react-router-dom';
import { CommentContext } from "./CommentProvider"
// import "./Comment.css"

export const Comment = ( { comment } ) => {

    const { deleteComment, getCommentById } = useContext(CommentContext)
    const [comments, setComments] = useState({})

    const history = useHistory();
    const {commentId} = useParams();

    const handleDelete = () => {
        deleteComment(comment.id)
            .then(() => {
            history.push("/comments")
        })
    }

    useEffect(() => {
        // getComments()
        }, [])

    return (
        <section className="comment">
            <h3 className="comment__text">{ comment.content }</h3>
            <button id="edit__button" onClick={() => {
                history.push(`/comments/update/${comment.id}`)
                }}>Edit
            </button>
            <button id="delete__comment" onClick={handleDelete}>Delete Comment</button>
        </section>
    )
}