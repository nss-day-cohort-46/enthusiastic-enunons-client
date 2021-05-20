import React, { useState } from "react";

/*
    The context is imported and used by individual components
    that need data
*/
export const TagContext = React.createContext();

/*
 This component establishes what data can be used.
 */
export const TagProvider = props => {
  const [tags, setTags] = useState([]);

  const getTags = () => {
    return fetch("http://localhost:8000/tags", {
      headers: {
        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
      }
    })
      .then(res => res.json())
      .then(setTags);
  };

  const getTagById = (id) => {
    return fetch(`http://localhost:8000/tags/${id}`, {
      headers: {
        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
      }
    })
      .then(res => res.json())
  }

  const createTag = (tag) => {
    return fetch("http://localhost:8000/tags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
      },
      body: JSON.stringify(tag)
    })
      .then(res => res.json())
      .then(getTags)
  }

  return (
    <TagContext.Provider
      value={{
        tags,
        getTags,
        createTag,
        getTagById
      }}
    >
      {props.children}
    </TagContext.Provider>
  );
};
