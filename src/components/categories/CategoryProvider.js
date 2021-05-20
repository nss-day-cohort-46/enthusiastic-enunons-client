import React, { useState } from "react"

export const CategoryContext = React.createContext()
let fetchHost = "http://localhost:8000"

export const CategoryProvider = (props) => {
    const [categories, setCategories] = useState([])
    const [searchTerms, setTerms] = useState("")

    const getCategories = (searchTerms) => {
        // debugger
        return fetch(`${fetchHost}/categories?searchTerms=${searchTerms}`,{
            headers:{
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        }
        )
            .then(res => res.json())
            .then(setCategories)
    }

    const addCategory = category => {
        return fetch(`${fetchHost}/categories`,{
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(category)
        })
        // .then(getCategories)
    }
    
    const getCategoryById = (id) => {
        return fetch(`${fetchHost}/categories/${id}`,{
            headers:{
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        }
        )
        .then(res => res.json())
    }
    
    const updateCategory = category => {
        // debugger
        return fetch(`${fetchHost}/categories/${category.id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(category)
        })
        .then(getCategories)
    }
    
    const deleteCategory = categoryId => {
        return fetch(`${fetchHost}/categories/${categoryId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`,
            }
        })
            .then(getCategories)
    }

    return (
        <CategoryContext.Provider value={{
            categories, searchTerms, setTerms, getCategories, addCategory, getCategoryById, updateCategory, deleteCategory
        }}>
            {props.children}
        </CategoryContext.Provider>
    )
}