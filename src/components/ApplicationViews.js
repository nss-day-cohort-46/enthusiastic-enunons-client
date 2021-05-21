import React from "react"
import { Route } from "react-router-dom"
import { UserList } from "./users/UserList"
import { UserProfile } from "./auth/Profile"
import { UserProvider } from "./users/UserProvider"
import { CategoryProvider } from "./categories/CategoryProvider"
import { CategoryList } from "./categories/CategoryList"
import { CategoryForm } from "./categories/CategoryForm"
import { PostProvider } from "./posts/PostProvider"
import { PostList } from "./posts/PostList"
import { PostDetail } from "./posts/PostDetail"
import { PostForm } from "./posts/PostForm"
import { HumanDate } from "./utils/HumanDate"
import { CommentProvider } from "./comments/CommentProvider"
import { CommentForm } from "./comments/CommentForm"
import { CommentList } from "./comments/CommentList"

// import { PostForm } from "./posts/PostForm"

export const ApplicationViews = (props) => {
    return (
        <>
            <main style={{
                margin: "5rem 2rem",
                lineHeight: "1.75rem"
            }}>
            </main>
            <CommentProvider>

            <UserProvider>
                <Route exact path="/users">
                    <UserList />
                </Route>

                <Route exact path="/">
                    Welcome to the homepage!
                    <CommentList />
                    {/* <CommentForm /> */}


                </Route>

                <Route exact path="/users/profile/:userId(\d+)">
                    <UserProfile />
                </Route>
            </UserProvider>
            </CommentProvider>


            <CommentProvider>
                <PostProvider>
                    <Route exact path="/comments">
                        <CommentList />
                    </Route>
                    {/* <Route exact path="/comments/create">
                        <CommentForm />
                    </Route> */}
                    {/* <Route exact path="/comments/:commentId(\d+)/update">
                            <CommentForm />
                    </Route> */}
                </PostProvider>
            </CommentProvider>

            <CommentProvider>
                <CategoryProvider>
                    <PostProvider>
                        <Route exact path="/posts">
                            <PostList />
                        </Route>

                        <Route exact path="/posts/:postId(\d+)"> 
                            <PostDetail />
                            <CommentForm />
                        </Route>

                        <Route exact path="/posts/create">
                            <PostForm />
                        </Route>

                        <Route exact path="/categories">
                            <CategoryList />
                        </Route>

                        <Route path="/categories/create">
                            <CategoryForm />
                        </Route>

                        <Route path="/categories/edit/:categoryId(\d+)">
                            <CategoryForm />
                        </Route>
                        </PostProvider>
                </CategoryProvider>
            </CommentProvider>
        </>
    )
}
