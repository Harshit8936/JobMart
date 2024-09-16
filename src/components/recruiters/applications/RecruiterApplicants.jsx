import React, { useEffect } from 'react'
import ApplicantsTable from './ApplicantsTable'
import { toast } from 'sonner'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constants'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setApplicants } from '@/redux/applicationSlice'
import { Button } from '@/components/ui/button'
import { ArrowBigLeft } from 'lucide-react'

export default function RecruiterApplicants() {
    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {applicants} = useSelector(store=>store.application);
    useEffect(()=>{
        const getApplicants = async()=>{
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${jobId}/applicants`,{
                    withCredentials: true,
                })
                // if(res.data.success){
                    dispatch(setApplicants(res.data.applicants));
                // }
            } catch (error) {
                toast.error(error.response)
            }
        }
        getApplicants();
    },[])
  return (
    <div>
        <div className='flex gap-5 p-8'>
          <Button onClick={()=>navigate("/recruiter/jobs")} variant="outline" className="flex items-center gap-2 text-gray-500 fonr-semibold">
            <ArrowBigLeft>
              <span>Back</span>
            </ArrowBigLeft>
          </Button>
        </div>
        <div className='max-w-7xl w-auto'>
            <h1 className='flex font-bold text-xl my-5'>Applicants {applicants?.applications?.length}</h1>
            <ApplicantsTable/>
        </div>
    </div>
  )
}
