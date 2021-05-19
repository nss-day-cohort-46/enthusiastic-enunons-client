import React, { useContext, useEffect } from "react"
import { CommentContext } from "./CommentProvider.js"
// import "./Comment.css"
import { useHistory } from "react-router-dom";


export const CommentList = (props) => {
    const { comments, getComments, deleteComment } = useContext(CommentContext)

    const history = useHistory()


    useEffect(() => {
        console.log("Fetching comments data from API")
        getComments()
    }, [])

    const handleDelete = (comment) => {
        deleteComment(comment.id)
        .then(() => {
            history.push("/comments")
        })
    }

    return (
        <>
        <h2>Comments</h2>

        <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
                history.push({ pathname: "/comments/create" })
            }}
            >Add Comment
        </button>
        <article className="comments">
            {
                comments.map(comment => {
                    // const attending = profile.events.some(evt => evt.id === event.id)
                    return <section key={`comment--${comment.id}`} className="comment">
                        <div className="post__comment">
                            <h3>
                                {comment.content}
                            </h3>
                        </div>
                        <br />

                        <div className="comment__edit">
                            <button className="btn btn-3 icon-create"
                                onClick={() => {
                                    history.push({pathname: `/comments/${comment.id}/update`})
                                }
                            }
                                >Edit
                            </button>
                        </div>

                        <button onClick={handleDelete}>Delete Comment</button>



                            {/* {
                                new Date(comment.createdOn).toLocaleDateString("en-US",
                                {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })
                            } */}
                    </section>
                })
            }
        </article >
        </>
    )
}