import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useCompanyById from '@/hooks/useCompanyById'
import { setLoading } from '@/redux/authSlice'
import { COMPANY_API_END_POINT } from '@/utils/constants'
import axios from 'axios'
import { ArrowBigLeft, Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

export default function CompanySetup() {
  const params = useParams();
  useCompanyById(params.id)
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    logo: null
  });
  const { loading } = useSelector(store => store.auth);
  const {singleCompany} = useSelector(store=>store.company);
  const navigate = useNavigate();
  const changeEventHanadler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  const fileEventHanadler = (e) => {
    setInput({ ...input, logo: e.target.files?.[0] });
  }
  const dispatch = useDispatch();
  const handleForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name)
    formData.append("description", input.description)
    formData.append("website", input.website)
    formData.append("location", input.location)
    if (input.logo) {
      formData.append("logo", input.logo)
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setInput({ name: "", description: "", website: "", location: "", logo: null });
        navigate("/recruiter/companies");
      }
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      dispatch(setLoading(false));
    }

  }
  useEffect(()=>{
    setInput({
      name: singleCompany.name || "",
    description: singleCompany.description || "",
    website: singleCompany.website || "",
    location: singleCompany.location || "",
    logo: singleCompany.logo || null,
    })
  },[singleCompany])
  return (
    <div className='max-w-xl mx-auto my-10'>
      <form method='post' onSubmit={handleForm}>
        <div className='flex gap-5 p-8'>
          <Button onClick={()=>navigate("/recruiter/companies")} variant="outline" className="flex items-center gap-2 text-gray-500 fonr-semibold">
            <ArrowBigLeft>
              <span>Back</span>
            </ArrowBigLeft>
          </Button>
          <h1 className='flex font-bold'>Company Setup</h1>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <Label className='flex'>Company Name</Label>
            <Input type="text" placeholder="Enter company Name" name="name" value={input.name} onChange={changeEventHanadler} />
          </div>
          <div>
            <Label className='flex'>Description</Label>
            <Input type="text" placeholder="Enter Description" name="description" value={input.description} onChange={changeEventHanadler} />
          </div>
          <div>
            <Label className='flex'>Website</Label>
            <Input type="text" placeholder="Enter Website" name="website" value={input.website} onChange={changeEventHanadler} />
          </div>
          <div>
            <Label className='flex'>Location</Label>
            <Input type="text" placeholder="Enter Location" name="location" value={input.location} onChange={changeEventHanadler} />
          </div>
          <div>
            <Label className='flex'>Logo</Label>
            <Input type="file" name="logo" accept="image/*" onChange={fileEventHanadler} />
          </div>
        </div>
        {loading ? 
                <Button className='w-full my-4'><Loader2 className='mr-2 h-4 w-4 animate-spin'/>Loading</Button> : 
                <Button type="submit" className='w-full my-4' >Update</Button>}
      </form>

    </div>
  )
}
