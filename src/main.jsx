import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ProtectedRoute } from './components'
import { AddPost, AllPosts, EditPost, ErrorPage, Home, Login, Post, Signup } from './pages'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true, 
        element: <Home />
      },
      {
        path: '/login',
        element: (
          <ProtectedRoute authentication={false}>
            <Login />
          </ProtectedRoute>
        )
      },
      {
        path: '/signup',
        element: (
          <ProtectedRoute authentication={false}>
            <Signup />
          </ProtectedRoute>
        )
      },
      {
        path: '/my-posts',
        element: (
          <ProtectedRoute authentication>
            {" "}
            <AllPosts />
          </ProtectedRoute>
        )
      },
      {
        path: '/add-post',
        element: (
          <ProtectedRoute authentication>
            {" "}
            <AddPost />
          </ProtectedRoute>
        )
      },
      {
        path: '/edit-post/:slug',
        element: (
          <ProtectedRoute authentication>
            {" "}
            <EditPost />
          </ProtectedRoute>
        )
      },
      {
        path: '/post/:slug',
        element: <Post />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
