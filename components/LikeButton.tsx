import React, {useState, useEffect} from 'react'
import { MdFavorite } from 'react-icons/md'
import useAuthStore from '../store/authStore'

interface IProps{
    handleLike: () => void;
    handleDislike: () =>void;
    likes: any[];
}

const LikeButton = ({handleLike, handleDislike, likes}: IProps) => {

const [liked, setLiked] = useState(false); //To check if the user has liked the video or not. If not then it will like the video else it will unlike the video.
const { userProfile }: any = useAuthStore();
const filterLikes = likes?.filter((item: any) => item._ref === userProfile?._id)


useEffect(() => {
    if(filterLikes?.length >0)
    {
        setLiked(true);
    }else{
        setLiked(false);
    }
}, [filterLikes, likes])


  return (
    <div className='flex gap-6'>
      <div className='mt-4 flex flex-col justify-contetn items-center cursor-pointer'>
        {liked ? (
            <div className='bg-primary rounded-full p-2 md:p-4 text-[#f51997]' onClick={handleDislike}>
                <MdFavorite className='text-lg md:text-2xl' />
            </div>
        ): (
            <div className='bg-primary rounded-full p-2 md:p-4' onClick={handleLike}>
                <MdFavorite className='text-lg md:text-2xl' />
            </div>
        )}
        <p className='text-md font-semibold '>{likes?.length || 0}</p>
      </div>
    </div>
  )
}

export default LikeButton
