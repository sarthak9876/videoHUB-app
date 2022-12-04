import {useState, useEffect } from 'react'
import Image from 'next/image'
import { GoVerified } from 'react-icons/go'
import axios from 'axios'
import VideoCard from '../../components/VideoCard'
import NoResults from '../../components/NoResults'
import { IUser, Video } from '../../types'


interface IProps{
    data:{
        user: IUser,
        userVideos: Video[],
        userLikedVideos: Video[]
    }
}

const Profile =({ data }:IProps) => {

    const { user, userVideos, userLikedVideos} = data;
    const [showUserVideos, setShowUserVideos] = useState(true);
    const [videosList, setVideosList] = useState<Video[]>([]);

    useEffect(() => {
    const fetchVideos = async () => {
      if (showUserVideos) {
        setVideosList(userVideos);
      } else {
        setVideosList(userLikedVideos);
      }
    };

    fetchVideos();
  }, [showUserVideos, userLikedVideos, userVideos]);

    const videos = showUserVideos ? 
    'border-b-2 border-black' : 'text-gray-400'

    const liked = !showUserVideos ? 
    'border-b-2 border-black' : 'text-gray-400' 

    return(
        
        <div className='w-full'>
            <div className='flex gap-6 md:gap-10 mb-4 bg-white w-full'>
                <div className='w-16 h-16 md:w-32 md:h-32'>
                <Image 
                src={user.image}
                width={120}
                height={120}
                className='rounded-full'
                alt='user profile pic'
                layout='responsive'
                />
                </div>

                <div className='flex flex-col justify-center'>
                <p className='flex gap-1 justify-center items-center font-bold text-2xl text-primary lowercase'>
                    {user.userName.replaceAll(' ','')}
                    <GoVerified className='text-blue-400' />
                </p>
                <p className='capitalize text-gray-400 text-xs md:text-xl'>
                    {user.userName}
                </p>
                </div>
          </div>

          <div>
            <div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full'>
                <p className={`text-xl font-semibold cursor-pointer mt-2  ${videos}`} onClick={() => setShowUserVideos(true)}>
                    Videos
                </p>
                <p className={`text-xl font-semibold cursor-pointer mt-2  ${liked}`} onClick={() => setShowUserVideos(false)}>
                    Liked
                </p>
            </div>

            <div className='flex gap-6 flex-wrap md:justify-start'>
            {videosList?.length > 0 ? (
                videosList.map((post: Video, idx: number) => (
                <VideoCard key={idx} post={post} />
                ))
            ) : (
                <NoResults
                text={`No ${showUserVideos ? '' : 'Liked'} Videos Yet`}
                />
            )}
        </div>

          </div>
        </div>

    )
}



export const getServerSideProps =  async ({ params: { id }}:{ params:{ id: string }}) =>{ //we use getServerSIdeProps to fetch data because when we use [id] as the name of the file then we have to fetch data and in NextJS we fetch data using the getServerSideProps function
    const res = await axios.get(`http://localhost:3000/api/profile/${id}`)
    return{
        props: { data: res.data}
    }
}
export default Profile