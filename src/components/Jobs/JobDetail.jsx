import React, { useEffect, useState } from 'react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constants';
import { toast } from 'sonner';

export default function JobDetail() {
    const {user} = useSelector(store=>store.auth);
    if(!user){
        return <Navigate to="/" />
    }
    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const {singleJob} = useSelector(store=>store.job);
    const isApplyInitially = singleJob?.applications?.some(application=>application.applicant_user_id === user?._id) || false;
    const [isApplied,setIsApplied] = useState(isApplyInitially);
    // jobApply function
    const jobApplyHandler = async()=>{
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`,{
                withCredentials:true
            })
            console.log("res",res.data)
            if(res.data.success){
                setIsApplied(true)         // update the local state
                const updatedSingleJob = {...singleJob,applications:[...singleJob.applications,{applicant_user_id:user?._id}]}
                dispatch(setSingleJob(updatedSingleJob));       // help us to real time UI update
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    useEffect(() => {
        const fetchSingleJob = async() => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get-job/${jobId}`, {
                    withCredentials: true,
                })
                if(res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application=>application.applicant_user_id === user?._id))
                }
            } catch (error) {
                toast.error(error.response.data.message)
            }
        }
        fetchSingleJob();
    }, [jobId,dispatch,user?._id])
    return (
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex justify-between'>
                <div>
                    <h1 className='flex font-bold text-xl'>{singleJob?.title}</h1>
                    <div className='items-center gap-2 mt-4 mb-4'>
                        <Badge className={'text-blue-700 font-bold mx-2'} variant="ghost">{singleJob?.positions} Positions</Badge>
                        <Badge className={'text-[#6A38C2] font-bold mx-2'} variant="ghost">{singleJob?.jobType}</Badge>
                        <Badge className={'text-[#F83002] font-bold mx-2'} variant="ghost">{singleJob?.salary} LPA</Badge>
                    </div>
                </div>
                <Button onClick={isApplied ? null : jobApplyHandler} disabled={isApplied} className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'} `} > {isApplied ? 'Alreday Applied' : 'Apply Now'}</Button>
            </div>
            <h1 className='flex border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
            <div className='my-4'>
                <h1 className='flex font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                <h1 className='flex font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                <h1 className='flex font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                <h1 className='flex font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experience} years</span></h1>
                <h1 className='flex font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary} LPA</span></h1>
                <h1 className='flex font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
                <h1 className='flex font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt?.split("T")[0]}</span></h1>

            </div>
        </div>
    )
}
