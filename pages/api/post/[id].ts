// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { postDetailQuery } from '../../../utils/queries';
import { client } from '../../../utils/client';
import { uuid} from 'uuidv4';

export default async function handler(req: NextApiRequest,
  res: NextApiResponse) {
    if(req.method === 'GET'){
    
        const { id} = req.query;
        const query = postDetailQuery(id);
        const data = await client.fetch(query);

        res.status(200).json(data[0]);
    
} else if(req.method === 'PUT'){

    const { comment, userId} = req.body;
    const { id }: any = req.query;

    const data = await client  // we are checking whether the user liked the image or not.
    .patch(id) // we want to change something in the client using patch
    .setIfMissing({ comments: []}) // this is only going to happen for the first like where we are initializing the like variable as a empty array
    .insert('after','comments[-1]', [ // we want ton insert at the end where likes[-1] means the end of the array
        {
            comment,
            _key: uuid(), //we are adding the key and ref just to have information of the person who liked the pic and store their info. UUID is used to give a new id to every new like.
            postedBy: { _type: 'postedBy', _ref: userId}
        }
    ])
    .commit()
    
    res.status(200).json(data);
}
}
