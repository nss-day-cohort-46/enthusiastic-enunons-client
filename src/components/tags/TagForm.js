import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { TagContext } from "./TagProvider.js"

export const TagForm = () => {
    const { getTags, createTag } = useContext(TagContext)
    const history = useHistory()

    const [currentTag, setTag] = useState({
        label: ""
    })

    useEffect(() => {
        getTags()
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

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    createTag({
                        label: currentTag.label
                    })
                        .then(() => history.push("/tags"))
                }} id="edit__button">
                Create Tag</button>
        </form>
    )

}