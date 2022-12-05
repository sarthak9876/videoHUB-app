import React, {useEffect, useState,useRef} from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'
import { MdOutlineCancel } from 'react-icons/md'
import { BsFillPlayFill } from 'react-icons/bs'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import axios from 'axios'
//import { BASE_URL } from '../../utils'
import { Video } from '../../types';
import useAuthStore from '../../store/authStore';
import Comments from '../../components/Comments'
import LikeButton from '../../components/LikeButton'


interface IProps{
  postDetails: Video;
}

const Detail = ({postDetails}: IProps) => {
  
  const [post, setPost] = useState(postDetails);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const router= useRouter();
  const [comment, setComment] = useState<string>('');
  const [isPostingComment, setIsPostingComment] = useState(false);



  const {userProfile}: any = useAuthStore();

  const onVideoClick = () => {
    if(isPlaying){
        videoRef?.current?.pause();
        setIsPlaying(false);
    }
    else{
        videoRef?.current?.play();
        setIsPlaying(true);
    }
  }

  useEffect(() => {
  if(post && videoRef?.current){
    videoRef.current.muted= isMuted;
  }
  },[post, isMuted])

  const handleLike = async (like: boolean) => {
    if(userProfile){
      const {data} = await axios.put('https://vidhub-app.vercel.app/api/like',{
        userId: userProfile._id,
        postId: post._id,
        like
      })

      setPost({...post, likes: data.likes}); //we are updating the likes with the new likes from data.
    }
  }

  const addComment = async (e: any) => {
    e.preventDefault();

    if(userProfile && comment ){
      setIsPostingComment(true);

      const {data} = await axios.put(`https://vidhub-app.vercel.app/api/post/${post._id}`,{
        userId: userProfile._id,
        comment,
      });

      setPost({...post, comments: data.comments});
      setComment('');
      setIsPostingComment(false);

    }

  }



  return (
    <>
    {post && (
      <div className='flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap '>
        {/* //bg-blurred-img bg-no-repeat bg-cover bg-center */}
      <div className='relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-black'>
        <div className='absolute top-6 left-2 lg:left-6 flex gap-6 z-50'>
          <p className='cursor-pointer' onClick={()=> router.back()}>
            <MdOutlineCancel className='text-white text-[35px]' />
          </p>
        </div>
        <div className='relative'>
          <div className='lg:h-[100vh] h-[60vh]'>
            <video
            ref={videoRef}
            loop
            onClick={()=> {}}
            src={post?.video?.asset.url}
            className='h-full'
            >

            </video>
          </div>

          <div className='absolute top-[45%] left-[45%] cursor-pointer'>
            {!isPlaying && (
              <button onClick={onVideoClick}>
                <BsFillPlayFill className='text-white text-6xl lg:text-8xl' />
              </button>
            )}
          </div>
        </div>

        <div className='absolute botton-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer'>
            
        { isMuted ? (

        <button
        onClick={() => setIsMuted(false)}>
        <HiVolumeOff 
        className='text-white text-2xl lg:text-4xl' 
        />
        </button>
        ) :(
        <button
         onClick={() => setIsMuted(true)}>
        <HiVolumeUp
        className='text-white text-2xl lg:text-4xl' 
        />
        </button>
       )} 
        </div>
      </div>


      {/* //Right side of the screen for comments, caption and likes information */}
      <div className='relative w-[1000px] md:w-[900px] lg:w-[700px] '>
          <div className='lg:mt-20 mt-10 '>

            <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
              <div className='ml-4 md:w-20 md:h-20 w-16 h-16'>
                <Link href='/'>
                <>
                    <Image 
                    width={62}
                     height={62}
                     className="rounded-full"
                     src={post.postedBy?.image} // passing the profile pic of the user through 'post' prop passed at the start. The user was created in the sanity console.
                     alt="Profile photo"
                     layout='responsive'
                     />
                </>
                </Link>
                </div>
                <div>
                <Link href='/'>
                    <div className='mt-3 flex flex-col gap-2'>
                        <p className='flex gap-2 items-center md:text-md font-bold text-primary'>
                        {post.postedBy.userName}{` `}  {/* passing the username of the user created in the sanity console */}
                        <GoVerified className='text-blue-400 text-md' />
                        </p>
                        <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>
                        {post.postedBy.userName}
                        </p>
                    </div>
                </Link>
                </div>
            </div>


            {/* Caption Area */}
            <p className='p-10 text-lg text-gray-600'>
              {post.caption}
            </p>

            {/* Like Button */}
            <div className='mt-10 px-10'>
              {userProfile && (
                <LikeButton 
                likes={post.likes}
                handleLike={() => handleLike(true)}
                handleDislike={() => handleLike(false)}
                />
              )}
            </div>

            {/* Comment Section */}
            <Comments 
              comment={comment}
              setComment={setComment}
              addComment={addComment}
              isPostingComment={isPostingComment}
              comments={post.comments}
            />


          </div>
      </div>

    </div>
    )}
    </>
    
  )

}

export const getServerSideProps = async ({ 
  params: { id }
}: { 
  params: { id: string}
}) => {
  const {data} = await axios.get(`https://vidhub-app.vercel.app/api/post/${id}`)

  return {
    props: { postDetails: data}
  }
}


export default Detail
