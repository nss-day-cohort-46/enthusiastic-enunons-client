import React, { useState, useContext, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom';
import { CategoryContext } from "./CategoryProvider"
import "./Category.css"

export const CategoryForm = () => {

    const { addCategory, getCategoryById, updateCategory } = useContext(CategoryContext)

    const [category, setCategory] = useState({
        label: "",
    });

    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();
    const { categoryId } = useParams();

    const handleControlledInputChange = (event) => {
        const newCategory = { ...category }
        
        newCategory[event.target.id] = event.target.value
       
        setCategory(newCategory)
      }

    const handleSaveCategory = () => {

        if (category.label === "") {
            window.alert("Please name your category!")
          } else {
            setIsLoading(true);
  
        if (categoryId){

            updateCategory({
                id: category.id,
                label: category.label,
            })
          .then(() => history.push("/categories"))
        } else {
            
            addCategory({
                label: category.label,
            })
            .then(() => history.push("/categories"))
            }
        }
    }

    useEffect(() => {
        if (categoryId) {
          getCategoryById(categoryId)
          .then(category => {
              setCategory(category)
              setIsLoading(false)
          })
        } else {
          setIsLoading(false)
      }
  }, [])

  return (
    <form className="category__form">
        <h2 className="categoryForm__title">{categoryId ? "Edit Category" : "Add New Category"}</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="label">Category:</label>
                <input type="text" id="label" required autoFocus className="form-control" placeholder="Category label"
                onChange={handleControlledInputChange}
                value={category.label}/>
            </div>
        </fieldset>

        <button className="btn btn-primary"
            disabled={isLoading}
            onClick={event => {
                event.preventDefault()
                handleSaveCategory()
            }}>
            {categoryId ? "Save Category" : "Add New Category"}</button>
        {categoryId ? <button className="btn btn-cancel"
            onClick={() => { history.push("/categories") }}>Cancel
            </button> : ""}
    </form>
)
}