import React, {useState, useEffect, useRef} from 'react'
import {Video } from '../types';
import { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {HiVolumeUp, HiVolumeOff} from 'react-icons/hi';
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import {GoVerified } from 'react-icons/go';


interface IProps{
    post: Video;
}


const VideoCard:NextPage<IProps> = ({post: {caption, postedBy, video, _id, likes}}) => {

const [isHover , setIsHover] = useState(false); // to check whether user is hovering over the video or not to perform some state action.
const [isPlaying, setIsPlaying] = useState(false); // to check whetehr the video is playing or not
const [isMuted, setIsMuted] = useState(false); // to check whether the video is muted or not

const videoRef = useRef<HTMLVideoElement>(null); // if we want to play and pause our video on click then we have to add something known as refs in REACT which we import using useRef hook in React
const onVideoPress = () => {
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
if(videoRef?.current){
    videoRef.current.muted= isMuted;
}
},[isMuted])

  return (
    <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
      <div>
        <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
            <div className='md:w-16 md:h-16 w-10 h-10'>
                <Link href={`/profile/${postedBy._id}`}>
                <>
                    <Image 
                    width={62}
                     height={62}
                     className="rounded-full"
                     src={postedBy?.image} // passing the profile pic of the user through 'post' prop passed at the start. The user was created in the sanity console.
                     alt="Profile photo"
                     layout='responsive'
                     />
                </>
                </Link>
                </div>
                <div>
                <Link href={`/profile/${postedBy._id}`}>
                    <div className='flex items-center gap-2'>
                        <p className='flex gap-2 items-center md:text-md font-bold text-primary'>
                        {postedBy.userName}{` `}  {/* passing the username of the user created in the sanity console */}
                        <GoVerified className='text-blue-400 text-md' />
                        </p>
                        <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>
                        {postedBy.userName}
                        </p>
                    </div>
                </Link>
                </div>
            </div>
        </div>

        <div className='lg:ml-20 flex gap-4 relative'>
            <div 
            onMouseEnter={() => setIsHover(true)} //setting the isHover property to true if mouse enters the video area
            onMouseLeave={() => setIsHover(false)} // setting the isHover property to false if mouse leaves the video area
            className='rounded-3xl'>
                <Link href={`/detail/${_id}`} >
                    <video 
                    loop  // playing the video in loop
                    ref={videoRef}
                    className='lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] w-[200px] rounded-2xl cursor-pointer bg-gray-100 '
                    src={video.asset.url} 
                    ></video>
                </Link>

                {isHover && (

                    <div className='absolute bottom-6 cursor-pointer left-8 
                    md:left-14 lg:left-0 flex gap-10 lg:justify-between
                     w-[100px] md:w-[50px] p-3 '>
                       { isPlaying ? (

                        <button onClick={onVideoPress}>
                            <BsFillPauseFill 
                            className='text-black text-2xl lg:text-4xl' 
                            />
                        </button>
                       ) :(

                        <button onClick={onVideoPress}>
                            <BsFillPlayFill 
                            className='text-black text-2xl lg:text-4xl' 
                            />
                        </button>
                       )} 

                       { isMuted ? (

                        <button
                        onClick={() => setIsMuted(false)}>
                            <HiVolumeOff 
                            className='text-black text-2xl lg:text-4xl' 
                            />
                        </button>
                       ) :(

                        <button
                        onClick={() => setIsMuted(true)}>
                            <HiVolumeUp
                            className='text-black text-2xl lg:text-4xl' 
                            />
                        </button>
                       )} 
                    </div>
                )}
            </div>
        </div>

      </div>
    
  );
};

export default VideoCard;
