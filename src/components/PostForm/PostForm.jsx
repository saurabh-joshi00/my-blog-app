import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import storageService from '../../appwrite/services/storage'
import databaseService from '../../appwrite/services/database'
import { Button, InputBox, RealtimeEditor, SelectBox } from '../index'
import toast from 'react-hot-toast'

function PostForm({post}) {

  const {register, handleSubmit, formState: {errors}, watch, setValue, control, getValues} = useForm({
    defaultValues: {
        title: post?.title || '',
        slug: post?.slug || post?.$id || '',
        content: post?.content || '',
        status: post?.status || 'active',
        author: post?.author || ''
    }
  })

  const navigate = useNavigate()
  
  const userData = useSelector((state) => state.auth.userData)

  const submit = async (data) => {
    if (!userData) {
        toast.error('User is not logged in!', {
            duration: 2000
        });
        console.log('User is not logged in!');
        return;
    }

    if (post) {
        let file = null;

        // Update flow
        try {
            file = data.image?.[0] ? await storageService.uploadFile(data.image[0]) : null

            if (data.image[0] && !file) throw new Error('File upload failed');
            
        } catch (error) {
            toast.error('Error while uploading file!', {
                duration: 2000
            });
            console.error('Error uploading file:', error);
            return
        }

        try {
            if (file && post.featuredImage) {
                await storageService.deleteFile(post.featuredImage);
                toast.success('Featured image deleted!');
            }
        } catch (error) {
            toast.error('Failed to remove previous image!', {
                duration: 2000
            });
            console.warn('Failed to remove previous image:', error)
        }

        try {
            const dbPost = await databaseService.updatePost(post.slug || post.$id, {
                ...data,
                featuredImage: file ? file.$id : post.featuredImage
            })
            toast.success('Post has been updated!');

            if (dbPost) {
                navigate('/my-posts')
            }
        } catch (error) {
            toast.error('Error while updating post!', {
                duration: 2000
            });
            console.error('Error updating post:', error);
        }
    } else {
        // Create flow
        const toastId = toast.loading('Creating post...');
        try {
            if (!data.image[0]) throw new Error('Image is required');
            
            const file = await storageService.uploadFile(data.image[0])
            if (!file) throw new Error('File upload failed');

            const dbPost = await databaseService.createPost({
                ...data,
                featuredImage: file.$id,
                userId: userData.$id
            })
            toast.success('New post created!', {
                id: toastId
            });

            if (dbPost) {
                navigate('/my-posts')
            }
        } catch (error) {
            toast.error('Error while creating post!', {
                id: toastId,
                duration: 2000
            });
            console.error('Error creating post:', error);
        }
    }
  }

  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string') {
        return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d]+/g, '-')
    } else {
        return ''
    }
  }, [])

  useEffect(() => {
    const subscription = watch((value, {name}) => {
        if (name === 'title') {
            setValue('slug', slugTransform(value.title), {shouldValidate: true})
        }
    })

    return () => {
        subscription.unsubscribe()
    }
  }, [watch, slugTransform, setValue])
    
  return (
    <>
        <form onSubmit={handleSubmit(submit)} className="flex-none flex-nowrap md:flex md:flex-wrap">
            <div className="w-full md:w-2/3 px-2">
                <div className='mb-4'>
                    <InputBox
                        label="Title: "
                        placeholder="Title"
                        {...register("title", { required: true })}
                    />

                    {errors?.title && <p className='text-red-600 text-sm'>Title is required!</p>}
                </div>
                
                <div className='mb-4'>
                    <InputBox
                        label="Slug: "
                        placeholder="Slug"
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        }}
                        disabled
                    />

                    {errors?.slug && <p className='text-red-600 text-sm'>Slug is required!</p>}
                </div>

                <div className='mb-4'>
                    <RealtimeEditor
                        label="Content: " name="content" control={control} defaultValue={getValues("content")} {...register("content", { required: true })}
                    />

                    {errors?.content && <p className='text-red-600 text-sm'>Content is required!</p>}
                </div>
            </div>
            <div className="w-full md:w-1/3 px-2">
                <div className="mb-4">
                    <InputBox
                        label="Featured Image: "
                        type="file"
                        className="file:mr-4 file:rounded-lg file:outline-none file:border-0 file:bg-gray-600 file:text-white file:px-4 file:py-2 file:text-sm file:font-semibold hover:file:bg-gray-700 file:duration-200 hover:file:cursor-pointer"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                    />
                    
                    {errors?.image && <p className='text-red-600 text-sm'>Image is required!</p>}
                </div>
                

                {post && (
                    <div className="w-1/2 md:w-full mb-4">
                        <img
                            src={storageService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}

                <SelectBox
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />

                <div className='mb-4'>
                    <InputBox
                        label="Author Name: "
                        placeholder="Author Name"
                        {...register("author", { required: true })}
                    />

                    {errors?.author && <p className='text-red-600 text-sm'>Author Name is required!</p>}
                </div>

                <Button
                    type="submit" 
                    bgColor={post ? "bg-green-600 hover:bg-green-700 duration-200" : undefined} 
                    className="w-full hover:bg-blue-700 duration-200"
                >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    </>
  )
}

export default PostForm
