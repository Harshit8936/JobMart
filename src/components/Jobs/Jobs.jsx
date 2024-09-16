import React, { useEffect, useState } from 'react'
import FilterJobs from './FilterJobs'
import Job from './Job'
import { useSelector } from 'react-redux'


// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8]

export default function Jobs() {
    const {jobs,searchedQuery} = useSelector(store=>store.job);
    const [filterJobs,setFilterJobs] = useState(jobs);

    useEffect(()=>{
        if(searchedQuery){
            const filteredJobs = jobs.filter((job)=>{
                return job?.title?.toLowerCase().includes(searchedQuery.toLowerCase()) || 
                job?.description?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                job?.location?.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        }else{
            setFilterJobs(jobs);
        }

    },[jobs,searchedQuery])


    return (
        <div className='max-w-7xl mx-auto mt-5'>
            <div className='flex gap-5'>
                <div className='w-20%'>
                    <FilterJobs />
                </div>
                {
                    filterJobs.length <= 0 ? <span>No Job Found</span> : (
                        <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                            <div className='grid grid-cols-3 gap-4'>
                                {
                                    filterJobs.map((job) => (
                                        <Job key={job._id} job={job}/>
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
