// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../utils/client';
import { singleUserQuery, userCreatedPostsQuery, userLikedPostsQuery } from '../../../utils/queries';



export default async function handler(  req: NextApiRequest,
  res: NextApiResponse) {
    if(req.method === 'GET'){

    const { id } = req.query;
    const query = singleUserQuery(id); 
    const userVideoQuery = userCreatedPostsQuery(id);
    const userLikedQuery = userLikedPostsQuery(id);



    const user = await client.fetch(query); // we are fetching the user from the response and storing it inside of a variable and passing the in the json of the response with 200 code along with it.
    const userVideos = await client.fetch(userVideoQuery);
    const userLikedVideos = await client.fetch(userLikedQuery);


    res.status(200).json({user: user[0], userVideos, userLikedVideos});




}
//   res.status(200).json({ name: 'Response Success' })
}
