import React, { useEffect, useState } from 'react'
import { Button, Container, Pagination, PostCard, SearchBar } from '../components'
import databaseService from '../appwrite/services/database'
import { useSelector } from 'react-redux'

function AllPosts() { 

  const [posts, setPosts] = useState([])
  const [currentFilter, setCurrentFilter] = useState('allPosts')
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  const userData = useSelector((state) => state.auth.userData)

  const getStatusFromFilter = (filterValue) => {
    if (filterValue === 'activePosts') return 'active'
    if (filterValue === 'inactivePosts') return 'inactive'
    return null // null means all posts regardless of status
  }

  const handleFilterChange = (e) => {
    const filterValue = e.currentTarget.value
    setCurrentFilter(filterValue)
    setLoading(true)
  }

  useEffect(() => {
    setLoading(true)

    if (userData) {
        const status = getStatusFromFilter(currentFilter)
        databaseService.getFilteredPosts(userData.$id, status) 
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
        setLoading(false)
    }
  }, [currentFilter, userData, searchQuery])


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
        <div className='flex justify-between mr-8'>
            <SearchBar onSearch={setSearchQuery} />

            <select 
                value={currentFilter}
                onChange={handleFilterChange} 
                className='px-4 py-2 bg-white text-black rounded-lg outline-none focus:bg-gray-50 duration-200 border border-gray-400'
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
            : posts.length === 0 && debouncedQuery
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
                    
                    <Pagination setPosts={setPosts} userId={userData?.$id} status={getStatusFromFilter(currentFilter)} searchQuery={searchQuery}  />
                </Container>
            )
        } 
        
    </div>
  )
}

export default AllPosts
