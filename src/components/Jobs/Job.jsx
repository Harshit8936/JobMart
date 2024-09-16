import React from 'react'
import { Button } from '../ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { useNavigate } from 'react-router-dom'

export default function Job({job}) {
    const navigate = useNavigate();
    const daysAgoFunction = (mongoDbTime)=>{
        const createdAt = new Date(mongoDbTime);
        const currentTime = new Date();
        const timeDifferenece = currentTime - createdAt;
        return Math.floor(timeDifferenece / (1000*24*60*60))

    }
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray1-100'>
            <div className='flex items-center justify-between'>
                <p className='flex text-sm text-gray-500'>{daysAgoFunction(job?.createdAt)===0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
                <Button variant="outline" className="flex rounded-full" size="icon"><Bookmark /></Button>
            </div>
            <div className='flex items-center gap-2 my-2'>
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src="https://cc-prod.scene7.com/is/image/CCProdAuthor/mascot-logo-design_P1_900x420?$pjpeg$&jpegSize=200&wid=900" />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='flex font-medium text-lg'>{job?.company_id?.name}</h1>
                    <p className='flex text-sm text-gray-500'>{job?.location}</p>
                </div>
            </div>
            <div>
                <h1 className='flex font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-800'>{job?.description}</p>
            </div>
            <div className='items-center gap-2 mt-4 mb-4'>
                <Badge className={'text-blue-700 font-bold mx-2'} variant="ghost">{job?.positions} Positions</Badge>
                <Badge className={'text-[#6A38C2] font-bold mx-2'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#F83002] font-bold mx-2'} variant="ghost">{job?.salary} LPA</Badge>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <Button onClick={()=>navigate(`/detail/${job?._id}`)}  variant="outline">Details</Button>
                <Button className="bg-[#7209b7]">Save for Later</Button>
            </div>
        </div>
    )
}
