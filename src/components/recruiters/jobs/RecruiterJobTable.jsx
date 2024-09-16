import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Edit2, EyeIcon, MoreHorizontal } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function RecruiterJobTable() {
    const {recruiterJobs,searchRecruiterJobByText} = useSelector(store=>store.job);
    const [filterRecruiterJobs,setFilterRecruiterJobs] = useState(recruiterJobs);
    const navigate = useNavigate();

    useEffect(()=>{
        const filteredJobs = recruiterJobs.length >=0 && recruiterJobs.filter((jobs)=>{
            if(!searchRecruiterJobByText){
                return true
            }
            return jobs?.title?.toLowerCase().includes(searchRecruiterJobByText.toLowerCase()) || jobs?.company_id?.name.toLowerCase().includes(searchRecruiterJobByText.toLowerCase());
        });
        setFilterRecruiterJobs(filteredJobs)
    },[recruiterJobs,searchRecruiterJobByText])
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent register Jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company</TableHead>
                        <TableHead>Job Title</TableHead>
                        <TableHead>Job Type</TableHead>
                        <TableHead>Posted Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {   filterRecruiterJobs?.length <=0 ? <span className='items-center font-bold'>No Jobs found</span>:
                        filterRecruiterJobs?.map((job) => (
                            <tr key={job._id}>
                                <TableCell>{job.company_id.name}</TableCell>
                                <TableCell>{job.title}</TableCell>
                                <TableCell>{job.jobType}</TableCell>
                                <TableCell>{job.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className='w-32 '>
                                            <div onClick={()=>navigate(`/recruiter/jobs/${job._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                            <div onClick={()=>navigate(`/recruiter/jobs/applicants/${job._id}`)} className='flex items-center gap-2 w-fit cursor-pointer mt-2'>
                                                <EyeIcon className='w-4' />
                                                <span>Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>
                        ))
                    }

                </TableBody>
            </Table>
        </div>
    )
}
