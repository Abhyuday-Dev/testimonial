import { Heart, StarIcon } from 'lucide-react'
import React from 'react'

const FeedbackCard = () => {
  return (
    <div className='w-full  rounded-lg bg-white p-8'>
      <div className='flex justify-between mb-6'>
        <h4 className='bg-blue-200 rounded-2xl text-blue-600 pr-4 pl-4 p-1 text-sm font-semibold'>Text</h4>
        <div className='flex gap-2'>
          <StarIcon color='blue'/>
          <Heart color='red' />
        </div>
      </div>
      <div className='mb-6'>Stars</div>
      <div className='text-sm mb-6'>Comment Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus consequatur animi alias vero culpa aliquam?</div>
      <div className='flex gap-[200px] md:gap-[300px]'>
        <div className='flex flex-col gap-1'>
        <h3 className='text-sm font-medium text-gray-400'>Name</h3>
          <p className='text-sm'>Abhyuday</p>
        </div>
        <div className='flex flex-col gap-1'>
          <h3 className='text-sm font-medium text-gray-400'>Submitted At</h3>
          <p className='text-sm'>{Date.now().toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}

export default FeedbackCard