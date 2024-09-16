import React from 'react'
import JobCard from './JobCard';
import { useSelector } from 'react-redux';

export default function LatestJobs() {
  const {jobs} = useSelector(store=>store.job);

  return (
    <div className='max-w-7xl mx-auto my-20'>
      <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top</span> Opening Jobs</h1>
      <div className='flex grid grid-cols-3 gap-4 my-5'>
        {
            jobs && jobs.length>0 ? jobs.slice(0,6).map((job,index)=><JobCard  key={job._id} job={job}/>) : <span>No Job Available</span>
        }
      </div>
    </div>
  )
}
