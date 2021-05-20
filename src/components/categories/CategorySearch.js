import React, { useContext } from "react"
import { CategoryContext } from "./CategoryProvider"

export const CategorySearch = () => {
    const { setTerms } = useContext(CategoryContext)

    return (
        <>
            <div>Search for a category</div>
            <input type="text" className="category__search"
                onChange={
                    (changeEvent) => {
                        setTerms(changeEvent.target.value)
                    }
                }
                placeholder="Enter search terms..." />
        </>
    )
}