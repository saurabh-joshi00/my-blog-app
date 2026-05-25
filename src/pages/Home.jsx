import React, { useEffect, useState } from 'react'
import databaseService from '../appwrite/services/database'
import { Container, Pagination, PostCard, SearchBar } from '../components'
import { useDispatch } from 'react-redux'
import { allPostsStore } from '../features/posts/postSlice'

function Home() {

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  const dispatch = useDispatch()    // Dispatch to Redux

  useEffect(() => {
    setLoading(true)

    // If no search query, get all active posts (initial load with pagination)
    databaseService.getAllActivePosts()
    .then((posts) => {
        if (posts) {
            setPosts(posts.rows)
            dispatch(allPostsStore({ allPosts: posts.rows }))
        } else {
            setPosts([])
            dispatch(allPostsStore({ allPosts: [] }))
        }
    })
    .catch((error) => {
        console.log('Error: ', error?.message);
        setPosts([])
        dispatch(allPostsStore({ allPosts: [] }))
    })
    .finally(() => setLoading(false))
  }, [dispatch])
  
 
  if (loading && posts.length === 0) {
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
  
  return (
    <div className="w-full py-8">
        <Container>
            <div className='mx-0 md:mx-8'>
                <SearchBar value={searchQuery} onSearch={setSearchQuery} />
            </div>
            
            {
                posts.length === 0 && !searchQuery
                ? (
                    <div className='w-full py-8 text-center'>
                        <Container>
                            <div className='p-16 w-full'>
                                <h1 className="text-2xl font-bold text-orange-600">No posts found yet!</h1>
                            </div>
                        </Container>
                    </div>
                )
                : posts.length === 0 && searchQuery
                ? (
                    <div className='w-full py-8 text-center'>
                        <Container>
                            <div className='p-16 w-full'>
                                <h1 className="text-2xl font-bold text-orange-600">No posts found for "{searchQuery}"</h1>
                            </div>
                        </Container>
                    </div>
                )
                : (
                    <Container>
                        {
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
                        }
                    </Container>
                )
            }

            <Pagination setPosts={setPosts} searchQuery={searchQuery} />
        </Container>
    </div>
  )

}

export default Home
