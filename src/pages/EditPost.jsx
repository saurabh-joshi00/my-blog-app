import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import databaseService from '../appwrite/services/database'
import { Container, PostForm } from '../components'
import { useSelector } from 'react-redux'

function EditPost() {

  const [post, setPost] = useState(null)

  const {slug} = useParams()

  const navigate = useNavigate()

  const allPosts = useSelector((state) => state.post.posts) // Get from Redux

  useEffect(() => {
    if (slug) {
        // First, check if post exists in Redux store
        const reduxPost = allPosts.find((p) => p.$id === slug || p.slug === slug)

        if (reduxPost) {
            setPost(reduxPost)
        } else {
            // If not in Redux, fetch from database
            databaseService.getPost(slug)
            .then((post) => {
                if (post) {
                    setPost(post)
                }
            })
            .catch((error) => {
                console.log('Error: ', error?.message);
            })
        }
    } else {
        navigate('/')
    }
  }, [slug, navigate, allPosts])
  
  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost
