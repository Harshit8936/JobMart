import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const [query,setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchHandler = ()=>{
    dispatch(setSearchedQuery(query));
    navigate("/browse")
  }

  return (
    <div className='text-center'>
        <div className='flex flex-col gap-5 my-10'>
        <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No 1. Job Mart Website</span>
        <h1 className='text-5xl font-bold'>Search, Apply & <br/> Get your <span className='text-[#6A38C2]'>Dream Jobs</span></h1> 
        <p>Best Job Portal for Job Seekers & Employers</p>
        <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
            <input type='text' className='outline-none border-none w-full' placeholder='Find your dream job here...' onChange={(e)=>setQuery(e.target.value)}/>
            <Button onClick={searchHandler} className='rounded-r-fill bg-[#6A38C2]'>
                <Search className='h-5 w-5'/>
            </Button>
        </div>
        </div>
    </div>
  )
}
