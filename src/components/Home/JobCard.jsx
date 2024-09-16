import React from 'react'
import { Badge } from '../ui/badge'

export default function JobCard({job}) {
    const daysAgoFunction = (mongoDbTime)=>{
        const createdAt = new Date(mongoDbTime);
        const currentTime = new Date();
        const timeDifferenece = currentTime - createdAt;
        return Math.floor(timeDifferenece / (1000*24*60*60))
    
    }
    return (
        <div className='pd-5 rounded-md shadow-xl bg-white border-gray-100 cursor-pointer'>
            <div className='items-center justify-between'>
                <p className='flex text-sm text-gray-500 mx-5'>{daysAgoFunction(job?.createdAt)===0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
            </div>
            <div>
                <h1 className='font-medium text-lg'>{job?.company_id?.name}</h1>
                <p className='text-sm text-gray-500'>{job?.location}</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='items-center gap-2 mt-4 mb-4'>
                <Badge className={'text-blue-700 font-bold mx-2' } variant="ghost">{job?.positions} Positions</Badge>
                <Badge className={'text-[#6A38C2] font-bold mx-2'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#F83002] font-bold mx-2'} variant="ghost">{job?.salary} LPA</Badge>
            </div>
        </div>
    )
}
