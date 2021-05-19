import React, { useContext, useEffect } from "react"
import { CommentContext } from "./CommentProvider.js"
// import "./Comment.css"
import { useHistory } from "react-router-dom";


export const CommentList = (props) => {
    const { comments, getComments } = useContext(CommentContext)

    const history = useHistory()


    useEffect(() => {
        console.log("Fetching comments data from API")
        getComments()
    }, [])

    return (
        <>
        <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
                history.push({ pathname: "/comments/new" })
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
                            {
                                new Date(comment.createdOn).toLocaleDateString("en-US",
                                {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })
                            }
                        {/* <button className="btn btn-2" onClick={() => joinEvent(event.id)}>Join</button> */}
                        {/* {
                            event.joined
                                ? <button className="btn btn-3"
                                    onClick={() => leaveEvent(event.id)}
                                    >Leave</button>
                                : <button className="btn btn-2"
                                    onClick={() => joinEvent(event.id)}
                                    >Join</button>
                        } */}
                    </section>
                })
            }
        </article >
        </>
    )
}