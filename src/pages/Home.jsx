import React, { useEffect, useState } from 'react'
import databaseService from '../appwrite/services/database'
import { Container, Pagination, PostCard, SearchBar } from '../components'

function Home() {

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    setLoading(true)

    if (searchQuery.trim()) {
        // If there's a search query, use getPaginatedPosts with search
        databaseService.getPaginatedPosts(6, null, 'next', searchQuery)
        .then((posts) => {
            if (posts) {
                setPosts(posts.rows)
            } else {
                setPosts([])
            }
        })
        .catch((error) => {
            console.log('Error: ', error?.message);
            setPosts([])
        })
        .finally(() => setLoading(false))
    } else {
        // If no search query, get all active posts (initial load with pagination)
        databaseService.getAllActivePosts()
        .then((posts) => {
            if (posts) {
                setPosts(posts.rows)
            } else {
                setPosts([])
            }
        })
        .catch((error) => {
            console.log('Error: ', error?.message);
            setPosts([])
        })
        .finally(() => setLoading(false))
    }
  }, [searchQuery])
  
 
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

  if (posts.length === 0 && !searchQuery) {
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
            <SearchBar onSearch={setSearchQuery} />

            {
                posts.length === 0 && searchQuery
                ? (
                    <div className='w-full py-8 text-center'>
                        <div className='p-16 w-full'>
                            <h1 className="text-2xl font-bold text-orange-600">No posts found for "{searchQuery}"</h1>
                        </div>
                    </div>
                )
                : (
                    <>
                        <div className='flex-none flex-nowrap md:flex md:flex-wrap'>
                            {
                                posts
                                .map((post) => (
                                    <div key={post.$id} className='p-2 w-full md:w-2/4 lg:w-1/4'>
                                        <PostCard {...post} />
                                    </div>
                                ))
                            }
                        </div>

                        <Pagination setPosts={setPosts} searchQuery={searchQuery} />
                    </>
                )
            }
        </Container>
    </div>
  )

}

export default Home
