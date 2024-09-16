import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import { useSelector } from 'react-redux';

export default function AppliedJobTable() {
   
    const {appliedJobs} = useSelector(store=>store.job);
    return (
        <div>
            <Table>
                <TableCaption>A list of your applied jobs </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Applied Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        appliedJobs && appliedJobs.length<=0 ? <span className='font-bold'>You haven't applied any job yet</span> :
                        appliedJobs.map((job) => (
                            <TableRow key={job._id}>
                                <TableCell className='flex'>{job?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell>{job?.job_id?.title}</TableCell>
                                <TableCell>{job?.job_id?.company_id?.name}</TableCell>
                                <TableCell className="text-right">
                                    {
                                    job?.status==='pending'? <Badge className="bg-gray-400">Pending</Badge> :  job?.status==='accepted'? <Badge className="bg-green-400">Accepted</Badge> : job?.status==='rejected'? <Badge className="bg-red-400">Rejected</Badge>:""
                                    }
                                    </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}
