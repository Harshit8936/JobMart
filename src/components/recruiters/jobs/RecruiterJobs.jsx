import React, { useEffect, useState } from 'react'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchRecruiterJobByText } from '@/redux/jobSlice'
import RecruiterJobTable from './RecruiterJobTable'
import useGetAllRecruiterJobs from '@/hooks/useGetAllRecruiterJobs'

export default function RecruiterJobs() {
    useGetAllRecruiterJobs();
  const navigate = useNavigate();
  const [input,setInput] = useState("");
  const dispatch = useDispatch();
  useEffect(()=>{
      dispatch(setSearchRecruiterJobByText(input))
  },[input])
  return (
    <div>
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between my-5'>
          <Input className='max-w-2xl' placeholder="Filter by Job Name or Company Name" onChange={(e)=>setInput(e.target.value)} />
          <Button onClick={()=>navigate("/recruiter/jobs/create")}>New Job</Button>
        </div>
        <RecruiterJobTable />
      </div>
    </div>
  )
}
