import React, { useEffect, useState } from 'react'
import { Container, Pagination, PostCard, SearchBar } from '../components'
import databaseService from '../appwrite/services/database'
import { useDispatch, useSelector } from 'react-redux'
import { allPostsStore } from '../features/posts/postSlice'

function AllPosts() { 

  const [posts, setPosts] = useState([])
  const [currentFilter, setCurrentFilter] = useState('allPosts')
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  const userData = useSelector((state) => state.auth.userData)  // Get from Redux

  const dispatch = useDispatch()    // Dispatch to Redux

  const getStatusFromFilter = (filterValue) => {
    if (filterValue === 'activePosts') return 'active'
    if (filterValue === 'inactivePosts') return 'inactive'
    return null // null means all posts regardless of status
  }

  const handleFilterChange = (e) => {
    const filterValue = e.currentTarget.value
    setCurrentFilter(filterValue)
    setLoading(true)
    e.currentTarget.blur()  // remove focus after selecting
  }

  useEffect(() => {
    setLoading(true)

    if (userData) {
        const status = getStatusFromFilter(currentFilter)
        
        // If no search query, get regular filtered posts (initial load with pagination)
        databaseService.getFilteredPosts(userData.$id, status) 
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
    } else {
        setLoading(false)
    }
  }, [currentFilter, userData, dispatch])


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
            <div className='flex-none md:flex md:justify-between md:items-center md:mx-8'>
                <SearchBar value={searchQuery} onSearch={setSearchQuery} />

                <select 
                    value={currentFilter}
                    onChange={handleFilterChange} 
                    className='ml-2 md:ml-0 mb-4 px-4 py-2 bg-white rounded-lg outline-none border border-gray-400 group focus-within:border-orange-600 focus-within:ring-2 focus-within:ring-orange-200 transition-all duration-200'
                > 
                    <option value="allPosts">All Posts</option>
                    <option value="activePosts">Active Posts</option>
                    <option value="inactivePosts">Inactive Posts</option>
                </select>
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

            <Pagination setPosts={setPosts} userId={userData?.$id} status={getStatusFromFilter(currentFilter)} searchQuery={searchQuery}  />
        </Container>
    </div>
  )
}

export default AllPosts
