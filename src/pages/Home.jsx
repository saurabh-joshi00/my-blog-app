import React, { useEffect, useState } from 'react'
import databaseService from '../appwrite/services/database'
import { Container, PostCard } from '../components'

function Home() {

  const [posts, setPosts] = useState([])
  
  const [loading, setLoading] = useState(true)
  
  useEffect(() => { 
        databaseService.getAllActivePosts()
        .then((posts) => {
            if (posts) {
                setPosts(posts.rows)
            }
        })
        .finally(() => setLoading(false))
  }, [])
 
  if (loading) {
    return (
        <div className='w-full py-8 mt-4 text-center'>
            <Container>
                <div className='p-16 w-full'>
                    <h1 className="text-2xl font-bold text-gray-500">Loading...</h1>
                </div>
            </Container>
        </div>
    )
  }

  if (posts.length === 0) {
    return (
        <div className='w-full py-8 mt-4 text-center'>
            <Container>
                <div className='p-16 w-full'>
                    <h1 className="text-2xl font-bold text-orange-600">No posts published yet!</h1>
                </div>
            </Container>
        </div>
    )
  }
  
  return (
    <div className="w-full py-8">
        <Container>
            <div className='flex flex-wrap'>
                {
                    posts
                    .sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt))
                    .map((post) => (
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

export default Home
