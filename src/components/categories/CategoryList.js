import React, { useContext, useEffect, useState } from "react"
import { CategoryContext } from "./CategoryProvider"
import { useHistory } from 'react-router-dom';
import { Category } from "./Category"
import "./Category.css"

export const CategoryList = () => {
    const { categories, getCategories, searchTerms } = useContext(CategoryContext)
    const [filteredCategories, setFilteredCategories] = useState([])
    const history = useHistory();

    useEffect(() => {
        getCategories(searchTerms)
    }, [searchTerms])

    //good useEffect
    // useEffect(() => {
    //     getCategories()
    // }, [])

useEffect(() => {
    // setFiltered(matchingCategories)
},[])

    return (
        <div className="category__page">
            <h1>Categories</h1>

            <button onClick={() => history.push("/categories/create")}>
                Create Category
            </button>

            <div className="categories">
                {
                    categories.map(category => {
                        return <Category key={category.id} category={category}/>
                    })
                }
            </div>
        </div>
    )
}