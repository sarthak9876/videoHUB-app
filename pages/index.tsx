import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from 'axios';
import { NextPage } from 'next';
import {Video } from '../types';
import VideoCard from '../components/VideoCard';
import NoResults from '../components/NoResults';
import { BASE_URL } from '../utils';


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

export const getServerSideProps = async ({
  query: {topic}
}: { 
  query: {topic: string}
}) => {

  let response = null;
  if(topic){
      response = await axios.get(`https://vidhub-app.vercel.app/api/discover/${topic}`);
  }else{
      response = await axios.get(`https://vidhub-app.vercel.app/api/post`); // this will fetch the data from the post subfolder which is present in the api folder
    }
  
  return{
    props: {
      videos: response.data
    }
  }
}

export default Home