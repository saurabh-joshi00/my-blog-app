import React, { useEffect, useState } from 'react'
import { Button, Container, PostCard, SelectBox } from '../components'
import databaseService from '../appwrite/services/database'
import { useSelector } from 'react-redux'

function AllPosts() { 

  const [posts, setPosts] = useState([])

  const userData = useSelector((state) => state.auth.userData)

  const [loading, setLoading] = useState(true)
  
  const filterPosts = async (e) => {
    try {
        let result;
        let value = e.currentTarget.value;

        if (value === 'allPosts') {
            result = await databaseService.getFilteredPosts(userData.$id);
        } else if (value === 'activePosts') {
            result = await databaseService.getFilteredPosts(userData.$id, 'active');
        } else if (value === 'inactivePosts') {
            result = await databaseService.getFilteredPosts(userData.$id, 'inactive');
        }

        if (result) {
            setPosts(result.rows)
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
  }

  useEffect(() => {
    if (userData) {
        databaseService.getFilteredPosts(userData.$id) 
        .then((posts) => {
            if (posts) {
                setPosts(posts.rows)
            }
        })
        .catch((error) => {
            console.log('Error: ', error?.message);
        })
        .finally(() => setLoading(false))
    } else {
        setLoading(false)
    }
  }, [userData])

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

  return (
    <div className="w-full py-8">
        <div className='pr-10 text-right'>
            <select onChange={filterPosts} className='bg-blue-500 text-white p-2 rounded-lg'>
                <option value="allPosts">All Posts</option>
                <option value="activePosts">Active Posts</option>
                <option value="inactivePosts">Inactive Posts</option>
            </select>
        </div>

        {
            posts.length === 0 ? (
                <div className='w-full py-8 text-center'>
                    <Container>
                        <div className='p-16 w-full'>
                            <h1 className="text-2xl font-bold text-orange-600">No posts found yet!</h1>
                        </div>
                    </Container>
                </div>
            ) : (
                <Container>
                    {
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
                    }
                </Container>
            )
        } 
        
    </div>
  )
}

export default AllPosts
