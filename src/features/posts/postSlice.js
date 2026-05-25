import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    posts: []
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        allPostsStore: (state, action) => {
            const allPosts = action.payload.allPosts
            state.posts = allPosts 
        },
        addPost: (state, action) => {
            const newPost = action.payload.newPost
            state.posts.push(newPost)
        },
        updatePost: (state, action) => {
            const postId = action.payload.documentId
            const postData = action.payload.updatedPost
            state.posts = state.posts.map((post) => post.$id === postId ? {...post, ...postData} : post)
        },
        deletePost: (state, action) => {
            const postId = action.payload.documentId
            state.posts = state.posts.filter((post) => post.$id !== postId)
        }
    }
})

export const { allPostsStore, addPost, updatePost, deletePost } = postSlice.actions

export default postSlice.reducer