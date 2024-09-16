import React, { useState } from 'react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Contact, Mail, PenIcon } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Label } from '../ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { toast } from 'sonner'
import useGetAllAppliedJobs from '@/hooks/useGetAllAppliedJobs'

const isResume = true;
export default function Profile() {
    useGetAllAppliedJobs();
    
    const [open, setOpen] = useState(false);
    const {user} = useSelector(store=>store.auth)
    if(!user){
        return <Navigate to="/"/>
    }

    return (
        <div>
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className="flex justify-between">
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24">
                            <AvatarImage alt="profile" src={user?.profile?.profilePhoto ? user?.profile?.profilePhoto : "https://github.com/shadcn.png'"} />
                        </Avatar>
                        <div>
                            <h1 className='flex font-medium text-xl'>{user?.fullname}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={()=>setOpen(true)} className="text-right" variant="outline"><PenIcon /></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>{user?.phone}</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1 className='flex font-medium'>Skills</h1>
                    <div className='flex mt-3'>
                        {
                            user?.profile?.skills?.length > 0 ? user?.profile?.skills?.map((item, index) => <Badge className="mx-1" variant="secondary" key={index}>{item}</Badge>) : <span>NA</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className='flex text-md font-bold '>Resume</Label>
                    <div className='flex'>
                        {
                            isResume ? <a href="https://youtube.com" className="text-blue-500 hover:underline cursor-pointer" target='_blank'>Patel Resume</a> : <span>NA</span>
                        }
                    </div>
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl '>
                <h1 className='flex font-bold text-lg my-5'>Applied Jobs</h1>
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}
