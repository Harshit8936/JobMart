import React, { useEffect, useState } from 'react'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import CompanyTable from './CompanyTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

export default function Companies() {
    useGetAllCompanies()
  const navigate = useNavigate();
  const [input,setInput] = useState("");
  const dispatch = useDispatch();
  useEffect(()=>{
      dispatch(setSearchCompanyByText(input))
  },[input])
  return (
    <div>
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between my-5'>
          <Input className='w-fit' placeholder="Filter by Company Name" onChange={(e)=>setInput(e.target.value)} />
          <Button onClick={()=>navigate("/recruiter/companies/create")}>New Company</Button>
        </div>
          <CompanyTable />
      </div>
    </div>
  )
}
