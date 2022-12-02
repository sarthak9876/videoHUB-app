// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../utils/client';
import { uuid } from 'uuidv4';

export default async function handler(  req: NextApiRequest,
  res: NextApiResponse) {
    if(req.method === 'PUT'){

    const { userId, postId, like} = req.body;

    const data = 
    like ? await client  // we are checking whether the user liked the image or not.
    .patch(postId) // we want to change something in the client using patch
    .setIfMissing({ likes: []}) // this is only going to happen for the first like where we are initializing the like variable as a empty array
    .insert('after','likes[-1]', [ // we want ton insert at the end where likes[-1] means the end of the array
        {
            _key: uuid(), //we are adding the key and ref just to have information of the person who liked the pic and store their info. UUID is used to give a new id to every new like.
            _ref: userId
        }
    ])
    .commit()
    : await client
    .patch(postId)
    .unset([`likes[_ref== '${userId}']`]) // we are unliking the image if liked after checking the like which we did from all the likes on the post
    .commit();

    res.status(200).json(data);



    
    
    
    
}
//   res.status(200).json({ name: 'Response Success' })
}
