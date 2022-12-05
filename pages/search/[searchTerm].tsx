import {useState } from 'react'
import Image from 'next/image'
import { GoVerified } from 'react-icons/go'
import axios from 'axios'
import VideoCard from '../../components/VideoCard'
import NoResults from '../../components/NoResults'
import { IUser, Video } from '../../types'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useAuthStore from '../../store/authStore'





const Search = ({ videos} : {videos: Video[]}) => {
 const [isAccounts, setIsAccounts] = useState(false);

    const router = useRouter();
    const {searchTerm}: any = router.query;
    const {allUsers} = useAuthStore();
    const isVideos = !isAccounts ? 
    'border-b-2 border-black' : 'text-gray-400'

    const accounts = isAccounts ? 
    'border-b-2 border-black' : 'text-gray-400' 

    const searchedAccounts= allUsers.filter((user: IUser) => user.userName.toLowerCase().includes(searchTerm.toLowerCase()));



    return (
    <div className='w-full '>
            <div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full'>
                <p className={`text-xl font-semibold cursor-pointer mt-2  ${accounts}`} onClick={() => setIsAccounts(true)}>
                    Accounts
                </p>
                <p className={`text-xl font-semibold cursor-pointer mt-2  ${isVideos}`} onClick={() => setIsAccounts(false)}>
                    Videos
                </p>
            </div> 
            {isAccounts ? (
                
                <div className='md:mt-16'>
                    {searchedAccounts.length >0 ? (
                        searchedAccounts.map((user: IUser, idx: number) => (
                            
                            <Link href={`/profile/${user._id}`} key={idx}>
                            <div className='flex p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200 gap-3'>
                                <div>
                                    <Image 
                                    src={user.image}
                                    width={50}
                                    height={50}
                                    className='rounded-full'
                                    alt='user profile pic'
                                    
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

                        ))
                    ): <NoResults text={`No results found for ${searchTerm} `} />}
                    
                </div>


            ): <div className='md:mt-16 flex flex-wrap gap-6 med:justify-start '>
                    {videos?.length ? (
                        videos?.map((video: Video, idx) => (
                            <VideoCard post={video} key={idx} />
                        ))
                    ): <NoResults text={`No results found for ${searchTerm} `} />}
                </div>
            }
    </div>
  )
}


export const getServerSideProps =  async ({ params: { searchTerm }}:{ params:{ searchTerm: string }}) =>{ //we use getServerSIdeProps to fetch data because when we use [id] as the name of the file then we have to fetch data and in NextJS we fetch data using the getServerSideProps function
    const res = await axios.get(`https://vidhub-app.vercel.app/api/search/${searchTerm}`)
    return{
        props: { videos: res.data}
    }
}


export default Search