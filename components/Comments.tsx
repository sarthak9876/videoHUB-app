import React, {Dispatch, SetStateAction} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'
import useAuthStore from '../store/authStore'
import NoResults from './NoResults'
import { IUser } from '../types'

interface IProps{
    isPostingComment: Boolean;
    comment: string;
    setComment: Dispatch<SetStateAction<string>>;
    addComment:(e: React.FormEvent) => void; 
    comments: IComment[]; // we are making the comments as an array of IComments type where we will keep track of all the comments 
}


interface IComment{
    comment: string;
    length?: number; // the question mark represents that this argument is optional and user may or may not use this
    _key: string;
    postedBy: { _ref?: string; _id?: string};
}

const Comments = ({comment, setComment, addComment, isPostingComment, comments}: IProps) => {

const { userProfile, allUsers} = useAuthStore();

  return (
    <div className='border-t-2 border-gray-200 pt-4 border-b-2 lg:pb-0 pb-[100px] bg-[#f8f8f8] px-10'>
      <div className='overflow-scroll lg:h-[475px]'>

        {Comments?.length >0 ? (
            comments.map((item, idx) => (
                <>
                {allUsers?.map((user: IUser) => ( //iterate over every user and see what comment they have posted
                    user._id === (item.postedBy._id || item.postedBy._ref) && (
                        <div className='p-2 items-center' key={idx}>
                            <Link href={`/profile/${user._id}`}>
                            <div className='flex items-start gap-3'>
                                <div className='w-8 h-8'>
                                    <Image 
                                    src={user.image}
                                    width={34}
                                    height={34}
                                    className='rounded-full'
                                    alt='user profile pic'
                                    layout='responsive'
                                    />
                                    </div>

                                    <div className='hidden xl:block'>
                                    <p className=' cursor-pointer flex gap-1 items-center font-bold text-md text-primary lowercase'>
                                        {user.userName.replaceAll(' ','')}
                                        <GoVerified className='text-blue-400' />
                                    </p>
                                    <p className='capitalize text-gray-400 text-xs'>
                                        {user.userName}
                                    </p>
                                </div>
                                </div>
                            </Link>

                            <div >
                                <p>{item.comment}</p>
                            </div>

                        </div>
                    )

                ))}
                </>
            ))
        ):(
            <NoResults text='No comments available.' />
        )}

    </div>
        
        {userProfile && 
            <div className='absolute bottom-0 left-0 pb-6 px-2 md:px-10'>
                <form onSubmit={addComment} className='flex gap-4'>
                    <input 
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder='Add Comment...'
                    className='bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg'
                    />
                    <button className='text-md text-gray-400'
                    onClick={addComment}
                    >
                    {isPostingComment ? 'Commenting...' : 'Comment'}
                    </button>
                </form>
            </div>
        }
    </div>
  )
}

export default Comments
