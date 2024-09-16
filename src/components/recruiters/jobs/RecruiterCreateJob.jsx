import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { setLoading } from '@/redux/authSlice';
import { JOB_API_END_POINT } from '@/utils/constants';
import axios from 'axios';
import { ArrowBigLeft, Loader2 } from 'lucide-react';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function RecruiterCreateJob() {
  const [job, setJob] = useState({
    title: "",
    description: "",
    skills: "",
    salary: "",
    experience: "",
    location: "",
    jobType: "",
    positions: "",
    company_id:""
  })
  const { companies } = useSelector(store => store.company);
  const {loading} = useSelector(store=>store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onChangeHandler = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value })
  }
  const selectChangeHandler = (value)=>{
    const selectedCompany = companies.find((company)=>company._id === value);
    setJob({...job,company_id:selectedCompany._id});
  }
  const jobFormHandler = async (e) => {
    e.preventDefault();
    console.log(job)
    try {
        dispatch(setLoading(true));
        const res = await axios.post(`${JOB_API_END_POINT}/post`,job,{
          headers:{
            'Content-Type':'application/json'
          },
          withCredentials:true
        });
        if(res.data.success){
          setJob({title: "",description: "",skills: "",salary: "",experience: "",location: "",jobType: "",positions: "",company_id:""})
          toast.success(res.data.message)
          navigate("/recruiter/jobs");
        }
    } catch (error) {
        toast.error(error.response.data.message)
    }finally{
      dispatch(setLoading(false))
    }

  }
  return (
    <div>
      <div className='flex gap-5 p-8'>
          <Button onClick={()=>navigate("/recruiter/jobs")} variant="outline" className="flex items-center gap-2 text-gray-500 fonr-semibold">
            <ArrowBigLeft>
              <span>Back</span>
            </ArrowBigLeft>
          </Button>
        </div>
      <div className='flex items-center justify-center my-5'>
        <form onSubmit={jobFormHandler} className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md '>
          <div className='grid grid-cols-2 gap-2'>
            <div>
              <Label className="flex">Title</Label>
              <Input type="text" className="focus-visible:ring-offset-0 my-1 " placeholder="Enter Job Title" name="title" onChange={onChangeHandler} value={job.title} />
            </div>
            <div>
              <Label className="flex">Description</Label>
              <Input type="text" className="focus-visible:ring-offset-0 my-1 " placeholder="Enter Job Description" name="description" onChange={onChangeHandler} value={job.description} />
            </div>
            <div>
              <Label className="flex">Skills</Label>
              <Input type="text" className="focus-visible:ring-offset-0 my-1 " placeholder="Enter Job Skills" name="skills" onChange={onChangeHandler} value={job.skills} />
            </div>
            <div>
              <Label className="flex">Salary</Label>
              <Input type="number" className="focus-visible:ring-offset-0 my-1 " placeholder="Enter Job Salary" name="salary" onChange={onChangeHandler} value={job.salary} />
            </div>
            <div>
              <Label className="flex">Experience Level</Label>
              <Input type="number" className="focus-visible:ring-offset-0 my-1 " placeholder="Enter Job Experience" name="experience" onChange={onChangeHandler} value={job.experience} />
            </div>
            <div>
              <Label className="flex">Location</Label>
              <Input type="text" className="focus-visible:ring-offset-0 my-1 " placeholder="Enter Job Location" name="location" onChange={onChangeHandler} value={job.location} />
            </div>
            <div>
              <Label className="flex">Job Type</Label>
              <Input type="text" className="focus-visible:ring-offset-0 my-1 " placeholder="Enter Job Type" name="jobType" onChange={onChangeHandler} value={job.jobType} />
            </div>
            <div>
              <Label className="flex">Positions</Label>
              <Input type="number" className="focus-visible:ring-offset-0 my-1 " placeholder="Enter No of Job Positions" name="positions" onChange={onChangeHandler} value={job.positions} />
            </div>
          </div>
          {
            companies.length > 0 && (
              <>
                <Label className="flex">Companies</Label>
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {
                        companies.map((company) => {
                          return (
                            <SelectItem key={company._id} value={company._id}>{company.name}</SelectItem>
                          )
                        })
                      }
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </>
            )
          }
          {loading ? 
                <Button className='mt-3 w-full'><Loader2 className='mr-2 h-4 w-4 animate-spin'/>Loading</Button> : 
                <Button type="submit" className='mt-3 w-full' >Post Job</Button>}
          {
            companies.length === 0 && <p className='text-xs text-red-600 font-bold my-3'>*Please register company first to post a job</p>
          }
        </form>
      </div>
    </div>
  )
}
