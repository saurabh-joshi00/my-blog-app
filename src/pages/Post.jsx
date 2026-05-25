import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import databaseService from '../appwrite/services/database'
import { Button, Container } from '../components'
import storageService from '../appwrite/services/storage'
import parse from 'html-react-parser'
import toast from 'react-hot-toast'
import { IoIosArrowBack } from 'react-icons/io'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { deletePost as deletePostStore } from '../features/posts/postSlice'

function Post() {

  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  const {slug} = useParams()

  const navigate = useNavigate()

  const userData = useSelector((state) => state.auth.userData)  // Get from Redux

  const dispatch = useDispatch()    // Dispatch to Redux

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
                dispatch(deletePostStore({ documentId: post.$id }));
                toast.success('Post has been deleted!');
                navigate("/my-posts");
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
                            <Button title='Back' className='cursor-pointer bg-yellow-400 hover:bg-yellow-500 duration-200'>
                                <IoIosArrowBack size={25} />
                            </Button>
                        </Link>
                    </div>
                }

                <img
                    src={storageService.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="rounded-xl w-full h-100 object-contain"
                />

                {
                    isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button title='Update Post' bgColor="bg-green-500" className="mr-3 cursor-pointer hover:bg-green-600 duration-200">
                                    <FaEdit size={25} />
                                </Button>
                            </Link>
                            <Button title='Delete Post' bgColor="bg-red-500" onClick={deletePost} className='cursor-pointer hover:bg-red-600 duration-200'>
                                <MdDelete size={25} />
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
