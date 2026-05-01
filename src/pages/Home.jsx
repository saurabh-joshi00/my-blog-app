import React, { useEffect, useState } from 'react'
import databaseService from '../appwrite/services/database'
import { Container, PostCard } from '../components'
import { useSelector } from 'react-redux'

function Home() {

  const [posts, setPosts] = useState([])

  const userData = useSelector((state) => state.auth.userData)

  const userPosts = userData ? posts.filter(post => post.userId === userData.$id) : []

  useEffect(() => { 
    if (userData) {
        databaseService.getFilteredPosts()
        .then((posts) => {
            if (posts) {
                setPosts(posts.rows)
            }
        })
    }
  }, [userData])

  if (!userData || posts.length === 0) {
    return (
        <div className='w-full py-8 mt-4 text-center'>
            <Container>
                <div className='flex flex-wrap'>
                    <div className='p-2 w-full'>
                        <h1 className="text-2xl font-bold text-orange-600">
                            Login to read posts!
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
    )
  } else {
    return (
        <div className="w-full py-8">
            <Container>
                <div className='flex flex-wrap'>
                    {
                        userPosts.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))
                    }
                </div>
            </Container>
        </div>
    )
  }
}

export default Home
