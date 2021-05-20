import React, { useContext, useEffect } from "react"
import { TagContext } from "./TagProvider"
import { useHistory } from 'react-router-dom';
import "./Tag.css"


export const TagList = () => {
    const { tags, getTags } = useContext(TagContext)
    const currentAdmin = localStorage.getItem("admin")

    const history = useHistory();

    useEffect(() => {
        getTags()
    }, [])

    return (
        <div className="tag__page">
            <h1>Tags</h1>

            <button onClick={() => history.push("/tags/create")}>
                Create Tag
            </button>

            <div className="tags">
                {
                    tags.map(tag => {
                        return <div key={tag.id} tag={tag}>
                            <div>{tag.label}</div>
                            {currentAdmin === "true" ?
                                <button onClick={() => history.push(`/tags/${tag.id}/edit`)}>
                                    Edit</button>
                                : ""}
                        </div>
                    })
                }

            </div>
        </div>
    )
}