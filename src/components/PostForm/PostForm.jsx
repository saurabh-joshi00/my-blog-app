import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import storageService from '../../appwrite/services/storage'
import databaseService from '../../appwrite/services/database'
import { Button, InputBox, RealtimeEditor, SelectBox } from '../index'

function PostForm({post}) {

  const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
    defaultValues: {
        title: post?.title || '',
        slug: post?.$id || '',
        content: post?.content || '',
        status: post?.status || 'active'
    }
  })

  const navigate = useNavigate()
  
  const userData = useSelector((state) => state.auth.userData)

  const submit = async (data) => {
    if (post) {
        const file = data.image[0] ? await storageService.uploadFile(data.image[0]) : null

        if (file) {
            await storageService.deleteFile(post.featuredImage)
        }

        const dbPost = await databaseService.updatePost(post.$id, {
            ...data,
            featuredImage: file ? file.$id : post.featuredImage
        })

        if (dbPost) {
            navigate(`/post/${dbPost.$id}`)
        }
    } else {
        const file = await storageService.uploadFile(data.image[0])

        if (file) {
            const fileId = file.$id
            data.featuredImage = fileId
            const dbPost = await databaseService.createPost({
                ...data,
                userId: userData.$id
            })

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
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
            setValue('slug', slugTransform(value.title, {shouldValidate: true}))
        }
    })

    return () => {
        subscription.unsubscribe()
    }
  }, [watch, slugTransform, setValue])
    
  return (
    <>
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <InputBox
                    label="Title: "
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <InputBox
                    label="Slug: "
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RealtimeEditor
                    label="Content: " name="content" control={control} defaultValue={getValues("content")} 
                />
            </div>
            <div className="w-1/3 px-2">
                <InputBox
                    label="Featured Image: "
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />

                {post && (
                    <div className="w-full mb-4">
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

                <Button
                    type="submit" 
                    bgColor={post ? "bg-green-500" : undefined} 
                    className="w-full"
                >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    </>
  )
}

export default PostForm
