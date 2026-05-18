import React from 'react'
import { Link } from 'react-router-dom'
import storageService from '../../appwrite/services/storage'

function PostCard({
    $id,
    title,
    featuredImage,
    $createdAt,
    author
}) {

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString
    }
  }

  return (
    <>
      <Link to={`/post/${$id}`}>
        <div className='w-full bg-red-200 hover:bg-red-300 duration-200 rounded-xl p-4'>
            <div className='w-full mb-4'>
              {
                featuredImage ? (
                  <img src={storageService.getFilePreview(featuredImage)} alt={title} className='rounded-xl h-56 w-full object-cover' />
                ) : (
                  <div className='w-full h-48 bg-gray-300 rounded-xl flex items-center justify-center'>
                    <span className='text-white'>No Image</span>
                </div>
                )
              }  
            </div>
            <p className='text-left text-sm text-gray-600 mt-2'>{formatDate($createdAt)}</p>
            <h2 
                className='text-xl font-bold text-left my-2'
            >
                {title}
            </h2>
            <p className='text-left text-sm font-semibold text-gray-800 mt-2'>{author}</p>
        </div>
      </Link>
    </>
  )
}

export default PostCard
