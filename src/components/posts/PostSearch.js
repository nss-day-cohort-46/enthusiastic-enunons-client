import React, { useContext } from "react"
import { PostContext } from "./PostProvider"

export const PostSearch = () => {
    const { setTerms } = useContext(PostContext)

    return (
        <>
            <div className="search">Search for an article</div>
            <input type="text" className="post__search"
                onChange={
                    (changeEvent) => {
                        setTerms(changeEvent.target.value)
                    }
                }
                placeholder="Enter search terms..." />
        </>
    )
}