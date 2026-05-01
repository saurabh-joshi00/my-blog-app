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

  const {slug} = useParams()

  const navigate = useNavigate()

  const userData = useSelector((state) => state.auth.userData)

  const isAuthor = post && userData ? post.userId === userData.$id : false

  useEffect(() => {
        if (slug) {
            databaseService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [userData, slug, navigate])

    const deletePost = () => {
        databaseService.deletePost(post.$id).then((status) => {
            if (status) {
                storageService.deleteFile(post.featuredImage);
                toast.success('Post deleted!');
                navigate("/");
            }
        });
    };
    
  return post && isAuthor ? (
    <div className='py-8'>
        <Container>
            <div className="w-full flex justify-center mb-4 relative border border-red-400 rounded-xl p-2">

                {
                    isAuthor && (
                        <div className="absolute left-6 top-6">
                            <Link to='/'>
                                <Button className='cursor-pointer'>
                                    Back
                                </Button>
                            </Link>
                        </div>
                    )
                }

                <img
                    src={storageService.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="rounded-xl"
                    style={{width: '400px', height: '400px', objectFit: 'cover'}}
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
