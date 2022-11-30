import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from 'axios';
import { NextPage } from 'next';
import {Video } from '../types';
import VideoCard from '../components/VideoCard';
import NoResults from '../components/NoResults';

interface IProps {
  videos: Video[]
}

 const Home = ({ videos }: IProps) => {
  console.log(videos);
  
  return (
    <div >
    <h1 className="flex flex-col gap-10 videos h-full">
      {videos.length ? (
        videos.map((video: Video) => (
          <VideoCard post={video} key={video._id} />
        ))
      ): (
        <NoResults text={'No Videos'} />
      )}
    </h1>
    </div>
  )
}

export const getServerSideProps = async () => {
  const { data } = await axios.get('http://localhost:3000/api/post'); // this will fetch the data from the post subfolder which is present in the api folder
  return{
    props: {
      videos: data
    }
  }
}

export default Home