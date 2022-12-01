import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { googleLogout, GoogleLogin} from '@react-oauth/google';
import { AiOutlineLogout } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';
import Logo from '../utils/videoHUB.png'
import { createOrGetUser } from '../utils';
//import { GoogleLogin } from 'react-google-login';
import useAuthStore from '../store/authStore';



const Navbar = () => {

const  {userProfile, addUser, removeUser} = useAuthStore();


  const responseGoogle = (response: any, addUser: any) => {
    console.log(response);
  }
  return (
    <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4'>
      <Link href='/'>
        <div className='w-[100px] md:w-[130px]'>
            <Image 
            className="cursor-pointer" 
            src={Logo} alt='videoHUB' 
            layout='responsive' />
        </div>
      </Link>

      <div> SEARCH</div>

      <div>
        {userProfile ? (
          <div className='flex gap-5 md:gap-10'>
            <Link href='/upload'>
              <button className='border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2'>
              <IoMdAdd className='text-xl' />{` `}
              <span className='hidden md:block'>Upload</span>
              </button>
            </Link>
            {userProfile.image && (
              <Link href='/'>
                <>
                    <Image 
                    width={40}
                     height={40}
                     className="rounded-full cursor-pointer"
                     src={userProfile.image} // passing the profile pic of the user through 'post' prop passed at the start. The user was created in the sanity console.
                     alt="Logged In User Profile photo"
                     
                     />
                </>
                </Link>
            )}
            <button type='button' className='px-3' onClick={() =>{
              googleLogout();
              removeUser();
            }} >
              <AiOutlineLogout color="red" fontSize={21} />
            </button>
          </div>
        ) : ( 
          <GoogleLogin
          onSuccess={(response) => createOrGetUser(response, addUser)}
          onError={() => console.log('Login Failed')} />

        
        )}
      </div>
    </div>
  );
}
export default Navbar
