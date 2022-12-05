import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { FaCloudUploadAlt } from 'react-icons/fa'
import {MdDelete} from 'react-icons/md'
import axios from 'axios'
import { SanityAssetDocument } from '@sanity/client'
import useAuthStore from '../store/authStore'
import { client } from '../utils/client'
import { topics } from '../utils/constants'
import { BASE_URL } from '../utils'

const Upload = () => {

const [isLoading, setIsLoading] = useState(false);
const [videoAsset, setVideoAsset] = useState<SanityAssetDocument>();
const [ wrongFileType, setWrongFileType] = useState(false);
const [caption, setCaption] = useState('');
const [category, setCategory] = useState(topics[0].name);
const [ savingPost, setSavingPost] = useState(false);

const router = useRouter();

const { userProfile}:{ userProfile: any} = useAuthStore();

const uploadVideo = async (e: any) => {
  const selectedFIle = e.target.files[0];
  const fileTypes = ['video/mp4','video/webm', 'video/ogg'];

  if(fileTypes.includes(selectedFIle.type)){
    client.assets.upload('file', selectedFIle, {
      contentType: selectedFIle.type,
      filename: selectedFIle.name
    })
    .then((data) => {
      setVideoAsset(data);
      setIsLoading(false);
    })
  }else{
    setIsLoading(false);
    setWrongFileType(true); // itwill trigger a alert on screen stating that the file which user is trying to upload is not the expected file format ad he/she should use the right file format only
  }

} 

const handlePost = async () =>{
  if( caption && videoAsset?._id && category){ // if caption and videoasset and category all 3 are present then only move forward to saving the post else do not move forward
    setSavingPost(true);

    const document = {
      _type: 'post',
      caption,
      video: {
        _type: 'file',
        asset: {
          _type: 'reference',
          _ref: videoAsset?._id
        }
      },
      userId: userProfile?._id,
      postedBy: {
        _type: 'postedBy',
        _ref: userProfile?._id
      },
      topic: category
    }

    await axios.post('https://vidhub-app.vercel.app/api/post', document);

    router.push('/');


  }
}

  return (
    <div className='flex w-full h-full absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-[#f8f8f8] justify-center'>
      <div className='bg-white w-[60%] rounded-lg xl:h-[80vh] flex gap-6 flex-wrap justify-between items-center p-14 pt-6'>
        <div>
          <div>
            <p className='text-2xl font-bold'>
              Upload Video
            </p>
            <p className='text-md text-gray-400 mt-1'>
              Post a video to your account
            </p>
          </div>

          <div className='border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100'>
            
            {isLoading ? (
              <p>Uploading...</p>
            ):
            (
            <div>
              {videoAsset ? (
                <div>
                  <video 
                  src={videoAsset?.url}
                  loop
                  controls
                  className='rounded-xl h-[450px] mt-16 background-black'
                  >

                  </video>
                </div>
              ): (
                <label className='cursor-pointer'>
                  <div className='flex flex-col items-center justify-center h-full'>
                    <div className='flex flex-col justify-center items-center '>
                      <p className='font-bold text-xl'>
                        <FaCloudUploadAlt className='text-gray-300 text-6xl' />
                      </p>
                      <p>
                        Upload Video
                      </p>
                    </div>
                    <p className='text-gray-400 text-center mt-10 text-sm leading-10'>
                      MP4 or WebM or ogg<br />
                      720x1280 or higher <br />
                      Up to 10 minutes <br />
                      Less than 2GB

                    </p>
                    <p className='bg-[#f51997] text-center mt-10 rounded text-white text-md p-2 w-52 outline-none font-medium'>
                      Select File
                    </p>
                  </div>
                  <input 
                  type='file'
                  name='upload-video'
                  onChange={(e) => uploadVideo(e)}
                  className='w-0 h-0'
                  />
                </label>
              )}
            </div>

            )}

            {wrongFileType && (
              <p className='text-center text-xl text-red-400 font-semibold mt-4 w-[250px]'>
                Please select a video file
              </p>
            )}
          </div>

        </div>

        <div className='flex flex-col gap-3 pb-10 '>
              <label 
              className='text-md font-medium'>
                Caption
              </label>

              <input 
              type='text' 
              value={caption} 
              onChange={(e)=>setCaption(e.target.value)}
              className='rounded outline-none text-md border-2 border-gray-200 p-2'
              />

              <label className='text-md font-medium'>
                Choose a Category
              </label>

              <select 
              onChange={(e)=>{setCategory(e.target.value)}}
              className='outline-none border-2 border-gray-200 text-md cpitalize lg:p-4 p-2 rounded cursor-pointer'
              >
                {topics.map((topics) => (
                  <option
                  key={topics.name}
                  className='bg-white text-gray-700 text-md outline-none capitalize hover:bg-slate-300 p-2'
                  value={topics.name}
                  >
                    {topics.name}
                  </option>
                ))}
              </select>

              <div className='flex gap-6 mt-10'>
                <button
                onClick={()=>{}}
                type='button'
                className='border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'
                >
                  Discard
                </button>

                  <button
                onClick={handlePost}
                type='button'
                className='bg-[#f51997] text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'
                >
                  Post
                </button>

              </div>



        </div>

          

      </div>

    </div>
  )
}

export default Upload
