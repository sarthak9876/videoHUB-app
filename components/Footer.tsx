import React from 'react'
import { footerList1, footerList2, footerList3 } from '../utils/constants';


const Footer = () => {

    const List = ({items, mt}: {items: string[], mt: boolean }) => ( // as we are using typescript here so we need to mention what is the type of the items here which in our case is array of strings. The reason why it asks the data type is to prevent any trouble from occuring in future.
        <div className="flex flex-wrap gap-2 ${mt && 'mt-5'} mt-5 ">
        {footerList1.map((item) => (
            <p key={item} classNametext-gray-400 text-security='m cursor-pointer hover:underline'>
                {item}
            </p>
        ))}
      </div>
    )


  return (
    <div className='mt-6 hidden xl:block'>
      <List items={footerList1} mt={false} />
      <List items={footerList2} mt />
      <List items={footerList3} mt />
      <p className='text-gray-400 text-sm mt-5'>2022 Kabootar</p>
    </div>
  )
}

export default Footer
