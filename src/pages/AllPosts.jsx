import React, { useEffect, useState } from 'react'
import { Button, Container, PostCard, SelectBox } from '../components'
import databaseService from '../appwrite/services/database'
import { useSelector } from 'react-redux'

function AllPosts() {

  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState('allPosts')
  
  const filterPosts = async (e) => {
    try {
        let result;
        let value = e.currentTarget.value;

        if (value === 'allPosts') {
            result = await databaseService.getFilteredPosts();
        } else if (value === 'activePosts') {
            result = await databaseService.getFilteredPosts('active');
        } else if (value === 'inactivePosts') {
            result = await databaseService.getFilteredPosts('inactive');
        }

        if (result) {
            setPosts(result.rows)
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
  }

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

  return (
    <>
      <div className="w-full py-8">
        <div className='pb-4 pr-10 text-right'>
            <select onChange={filterPosts} className='bg-blue-500 text-white p-2 rounded-lg'>
                <option value="allPosts">All Posts</option>
                <option value="activePosts">Active Posts</option>
                <option value="inactivePosts">Inactive Posts</option>
            </select>
        </div> 
        <Container>
            {
                <div className='flex flex-wrap'>
                    {
                        userPosts.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))
                    }
                </div>
            }
        </Container>
      </div>
    </>
  )
}

export default AllPosts
