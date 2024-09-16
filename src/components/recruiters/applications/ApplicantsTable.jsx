import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { APPLICATION_API_END_POINT } from '@/utils/constants';
import axios from 'axios';
import { MoreHorizontal } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

export default function ApplicantsTable() {
    const shortListingStatus = ['Accepted', 'Rejected'];
    const { applicants } = useSelector(store => store.application);
    const statusHandler = async(status,id)=>{
        console.log("called");
        try {
            const res = await axios.put(`${APPLICATION_API_END_POINT}/update-status/${id}`,{status},{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            })
            if(res.data.success){
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }

    }
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent applied users</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact No</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Applied Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants?.applications?.length > 0 ? 
                        applicants && applicants?.applications?.map((item) =>
                            (
                                <tr key={item._id}>
                                    <TableCell>{item?.applicant_user_id?.fullname}</TableCell>
                                    <TableCell>{item?.applicant_user_id?.email}</TableCell>
                                    <TableCell>{item?.applicant_user_id?.phone}</TableCell>
                                    <TableCell>
                                        {
                                        item?.applicant_user_id?.profile?.resume ? <a className='text-blue-600' href={item?.applicant_user_id?.profile?.resume} target='_blank'>Resume</a> : <span>NA</span>
                                        }
                                        
                                        </TableCell>
                                    <TableCell>{item?.createdAt?.split("T")[0]}</TableCell>
                                    <TableCell className="text-right cursor-pointer">
                                        {
                                            item?.status==='pending' ? 
                                            <Popover>
                                            <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                            <PopoverContent className="w-32">
                                                {   
                                                    
                                                    shortListingStatus.map((status, index) => {
                                                        return (
                                                            <div onClick={()=>statusHandler(status, item?._id)} key={index} className='flex w-fit my-2 cursor-pointer'>
                                                                <span>{status}</span>
                                                            </div>
                                                        )
                                                    })
                                                    
                                                }
                                            </PopoverContent>
                                        </Popover>
                                        :<span>{item?.status}</span>
                                        }
                                        
                                    </TableCell>
                                </tr>
                            )
                        )
                        : <span className='font-bold'>No Applicants Found for this job</span>
                    }

                </TableBody>
            </Table>

        </div>
    )
}
