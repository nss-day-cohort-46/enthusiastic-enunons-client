import React, { useContext, useEffect } from "react"
import { CommentContext } from "./CommentProvider.js"
import { Comment } from "./Comment"
import { useHistory, useParams } from "react-router-dom";
// import "./Comment.css"


export const CommentList = (props) => {
    const { comments, getComments, deleteComment } = useContext(CommentContext)

    const history = useHistory()


    useEffect(() => {
        console.log("Fetching comments data from API")
        getComments()
    }, [])

    // return (
    //     <>
    //     <h2>Comments</h2>

    //     <button className="btn btn-2 btn-sep icon-create"
    //         onClick={() => {
    //             history.push({ pathname: "/comments/create" })
    //         }}
    //         >Add Comment
    //     </button>
    //     <article className="comments">
    //         {
    //             comments.map(comment => {
    //                 // const attending = profile.events.some(evt => evt.id === event.id)
    //                 return (
    //                     <>
    //                         <div className="post__comment">
    //                             <h3>
    //                                 {comment.content}
    //                             </h3>
    //                         </div>
    //                         <br />

    //                         <div className="comment__edit">
    //                             <button className="btn btn-3 icon-create"
    //                                 onClick={() => {
    //                                     history.push({pathname: `/comments/${comment.id}/update`})
    //                                 }
    //                             }
    //                                 >Edit
    //                             </button>
    //                         </div>
    //                     </>
    //                 )

    //                     {/* <button onClick={handleDelete}>Delete Comment</button> */}



    //                         {/* {
    //                             new Date(comment.createdOn).toLocaleDateString("en-US",
    //                             {
    //                                 weekday: 'long',
    //                                 year: 'numeric',
    //                                 month: 'long',
    //                                 day: 'numeric'
    //                             })
    //                         } */}
    //             })
    //         }
    //     </article >
    //     </>
    // )
    return (
        <div className="post__comments">
            <h1>Comments</h1>

            <button onClick={() => history.push("/comments/create")}>
                Create Comment
            </button>

            <div className="comments">
                {
                    comments.map(comment => {
                        return <Comment key={comment.id} comment={comment}/>
                    })
                }
            </div>
        </div>
    )
}