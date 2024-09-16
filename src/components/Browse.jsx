import React, { useEffect } from 'react'
import Job from './Jobs/Job'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
// const random = [1,2,3,4]

export default function Browse() {
  useGetAllJobs();
  const {jobs} = useSelector(store=>store.job);
  const dispatch = useDispatch();
  useEffect(()=>{
    return ()=>
      dispatch(setSearchedQuery(""))
  },[])
  return (
    <div className='max-w-7xl mx-auto my-10'>
      <h1 className='flex font-bold text-xl my-10'>Search Results ({jobs.length})</h1>
      <div className='grid grid-cols-3 gap-4'>
      {
        jobs.map((job)=>{
            return (
                <Job key={job._id} job={job} />
            )
        })
      }
      </div>
    </div>
  )
}
