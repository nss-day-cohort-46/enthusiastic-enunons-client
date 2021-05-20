import React, { useContext, useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { TagContext } from "./TagProvider.js"

export const TagForm = () => {
    const { getTags, createTag, getTagById, updateTag } = useContext(TagContext)
    const history = useHistory()
    const { tagId } = useParams()

    const [currentTag, setTag] = useState({
        label: ""
    })

    useEffect(() => {
        getTags()
            .then(() => {
                if (tagId) {
                    getTagById(tagId)
                        .then(tag => {
                            setTag(tag)
                        })
                }
            })
    }, [])

    const handleChange = (event) => {
        const newTag = { ...currentTag }
        newTag[event.target.id] = event.target.value
        setTag(newTag)
    }

    return (
        <form>
            <h2>Create A Tag</h2>
            <fieldset>
                <div>
                    <label htmlFor="tagLabel">Type Below</label>
                    <input type="text" id="label" name="label" required className="form-control"
                        value={currentTag.label}
                        onChange={handleChange} />
                </div>
            </fieldset>
            {tagId ?
                <button type="submit"
                    onClick={evt => {
                        evt.preventDefault()
                        updateTag({
                            id: tagId,
                            label: currentTag.label
                        })
                            .then(() => history.push("/tags"))
                    }} id="edit__button">
                    Save Tag</button>
                : <button type="submit"
                    onClick={evt => {
                        evt.preventDefault()
                        createTag({
                            label: currentTag.label
                        })
                            .then(() => history.push("/tags"))
                    }} id="edit__button">
                    Add Tag</button>
            }
            <button onClick={() => {
                history.push("/tags")
            }} id="delete__button">Cancel</button>
        </form>
    )

}