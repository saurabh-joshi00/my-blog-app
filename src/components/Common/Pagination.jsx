import React, { useEffect, useState } from 'react'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'
import databaseService from '../../appwrite/services/database';

function Pagination({setPosts, userId = null, status = null, searchQuery = null}) {

  const [limit, setLimit] = useState(6)
  const [firstId, setFirstId] = useState(null)
  const [lastId, setLastId] = useState(null)
  const [hasNextPage, setHasNextPage] = useState(0) // Total number of pages
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [totalPosts, setTotalPosts] = useState(0)

  const fetchPosts = async (cursor = null, direction = 'next') => {
    try {
        setLoading(true)

        let result;

        // If userId is provided, use user-filtered pagination
        if (userId) {
            result = await databaseService.getPaginatedUserPosts(userId, status, limit, cursor, direction, searchQuery)
        } else {
            // Otherwise use global pagination
            result = await databaseService.getPaginatedPosts(limit, cursor, direction, searchQuery)
        }
        
        if (result) {
            let posts = result.rows;

            setPosts(posts)

            setFirstId(posts[0]?.$id)

            setLastId(posts[posts.length - 1]?.$id)

            setTotalPosts(result.total)

            // Calculate total number of pages: Used Math.ceil() to get a round up value
            setHasNextPage(Math.ceil(result.total / limit))
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
    } finally {
        setLoading(false)
    }
  }

  // Initial fetch and refetch when limit, userId, or status changes
  useEffect(() => {
    setCurrentPage(1)   // Reset to page 1 when filters change
    fetchPosts()
  }, [limit, userId, status, searchQuery])

  // Next page: only enable if current page is less than total pages
  const handleNext = () => {
    if (lastId && currentPage < hasNextPage) {
        setLoading(true)
        setCurrentPage((prev) => prev + 1)
        fetchPosts(lastId, 'next')
    }
  }

  // Previous page: only enable if not on first page
  const handlePrev = () => {
    if (firstId && currentPage > 1) {
        setLoading(true)
        setCurrentPage((prev) => prev - 1)
        fetchPosts(firstId, 'prev')
    }
  }

  useEffect(() => {
    window.scrollTo({top: 0, behavior:'smooth'})
  }, [limit, currentPage])
    
  return (
    <>
      <div className='w-full p-2 mt-8'>
        <div className='md:flex items-center justify-between'>
            <div className='flex items-center justify-center mb-4 md:mb-0'>
                <select
                    value={limit}
                    onChange={(e) => {
                        setLimit(Number(e.target.value))
                        setCurrentPage(1)
                    }} 
                    className='px-4 py-2 bg-white text-black p-2 rounded-lg outline-none focus:bg-gray-50 duration-200 border border-gray-400'
                >
                    <option value="6">6</option>
                    <option value="12">12</option>
                    <option value="24">24</option>
                    <option value="48">48</option>
                    <option value="96">96</option>
                </select>
                <span className='ml-4 font-semibold'>{loading ? 'Loading...' : `Posts per page. Total: ${totalPosts}`}</span>
            </div>
            <div className='flex items-center justify-center gap-8'>
                <button 
                    disabled={currentPage === 1}
                    onClick={handlePrev}
                    className={`flex items-center p-2 rounded-lg duration-200 ${currentPage > 1 ? 'bg-gray-300 hover:bg-gray-400 cursor-pointer' : 'bg-gray-200 cursor-not-allowed opacity-50'}`}
                >
                    <GrFormPrevious size={20} /> 
                    <span className='font-semibold'>Prev</span>
                </button>
                
                <span className='text-sm'>{loading ? 'Loading...' : `Page: ${currentPage}`}</span>

                <button 
                    disabled={currentPage === hasNextPage}
                    onClick={handleNext}
                    className={`flex items-center p-2 rounded-lg duration-200 ${currentPage < hasNextPage ? 'bg-gray-300 hover:bg-gray-400 cursor-pointer' : 'bg-gray-200 cursor-not-allowed opacity-50'}`}
                >
                        <span className='font-semibold'>Next</span>
                        <GrFormNext size={20} />
                </button>
            </div>
        </div>
      </div>
    </>
  )
}

export default Pagination