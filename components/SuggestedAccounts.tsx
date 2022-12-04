import React, {useEffect} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'
import useAuthStore from '../store/authStore'
import { IUser } from '../types'




const SuggestedAccounts = () => {

  const {fetchAllUsers, allUsers} = useAuthStore();

  useEffect(()=>{
    fetchAllUsers(); //as soon as the suggested accounts function loads we are fetching all the users data from useAuthStore using fetchAllUsers function 

  },[fetchAllUsers])

  return (
    <div className='lg:border-b-2 border-gray-200 pb-4'>
      <p className='text-gray-500 font-semibold m-30 mt-4 hidden xl:block'>
        Suggested Accounts
      </p>
      
      <div>
        {/* Here we are iterating over the list of users which we called fro useAuthStore and then we are picking the top 6 people only using the slice method  */}
        {allUsers?.slice(0,6).map((user: IUser) =>(
          // Here we are creating a link for every suggested accounts so that if users clicks on any account then they will be redirected to a new page
          <Link href={`/profile/${user._id}`} key={user._id}> 
          <div className='flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded'>
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
              <p className='flex gap-1 items-center font-bold text-md text-primary lowercase'>
                {user.userName.replaceAll(' ','')}
                <GoVerified className='text-blue-400' />
              </p>
              <p className='capitalize text-gray-400 text-xs'>
                {user.userName}
              </p>
            </div>


          </div>
          </Link>
        ))} 
      </div>
    </div>
  )
}

export default SuggestedAccounts
