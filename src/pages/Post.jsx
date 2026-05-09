import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import databaseService from '../appwrite/services/database'
import { Button, Container } from '../components'
import storageService from '../appwrite/services/storage'
import parse from 'html-react-parser'
import toast from 'react-hot-toast'

function Post() {

  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  const {slug} = useParams()

  const navigate = useNavigate()

  const userData = useSelector((state) => state.auth.userData)

  const isAuthor = post && userData ? post.userId === userData.$id : false

  useEffect(() => {
        if (slug) {
            databaseService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            })
            .catch((error) => {
                console.log('Error: ', error?.message);
            })
            .finally(() => setLoading(false))
        } else navigate("/");
  }, [userData, slug, navigate])

  const deletePost = () => {
        databaseService.deletePost(post.$id).then((status) => {
            if (status) {
                storageService.deleteFile(post.featuredImage);
                toast.success('Post deleted!');
                navigate("/");
            }
        })
        .catch((error) => {
            console.log('Error: ', error?.message);
        })
  };
    
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

  return post ? (
    <div className='py-8'>
        <Container>
            <div className="w-full flex justify-center mb-4 relative border border-red-400 rounded-xl p-2">

                {
                    <div className="absolute left-6 top-6">
                        <Link to='/'>
                            <Button className='cursor-pointer bg-yellow-400'>
                                Back
                            </Button>
                        </Link>
                    </div>
                }

                <img
                    src={storageService.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="rounded-xl w-full h-100 object-cover"
                />

                {
                    isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3 cursor-pointer">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost} className='cursor-pointer'>
                                Delete
                            </Button>
                        </div>
                    )
                }
            </div>
            <div className="w-full mb-6">
                <h1 className="text-2xl font-bold">{post.title}</h1>
            </div>
            <div className="browser-css">
                {parse(post.content)}
            </div>
        </Container>
    </div>
  ) : null
}

export default Post
