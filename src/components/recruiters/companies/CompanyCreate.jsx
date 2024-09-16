import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { setSingleCompany } from '@/redux/companySlice'
import { COMPANY_API_END_POINT } from '@/utils/constants'
import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export default function CompanyCreate() {
    const navigate = useNavigate();
    const [name,setName] = useState();
    const dispatch = useDispatch();
    const registerCompany = async()=>{
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/create`,{name},{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            })
            if(res?.data?.success){
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res.data.company._id;
                navigate(`/recruiter/companies/${companyId}`);
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }

    }
    return (
        <div>
            <div className='max-w-xl mx-auto'>
                <div className='my-10'>
                    <h1 className='flex font-bold text-2xl'>Your company Name</h1>
                    <p className=' flextext-gray-500'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat, similique?</p>
                </div>
                <Label className="flex">Company Name</Label>
                <Input type="text" className="my-2" placeholder="Microsoft,Google" name="name" onChange={(e)=>setName(e.target.value)} required/>
                <div className='flex items-center gap-2 my-10'>
                    <Button variant="outline" onClick={()=>navigate("/recruiter/companies")} >Cancel</Button>
                    <Button onClick={registerCompany}>Continue</Button>
                </div>
            </div>
        </div>
    )
}
