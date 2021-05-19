import React, { useContext, useEffect } from "react"
import { TagContext } from "./TagProvider"
import { useHistory } from 'react-router-dom';
import { Category } from "./Category"


export const TagList = () => {
    const { tags, getTags } = useContext(TagContext)

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
                        return <Tag key={tag.id} tag={tag} />
                    })
                }
            </div>
        </div>
    )
}