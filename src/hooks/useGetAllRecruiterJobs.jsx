import { setRecruiterJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constants'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'


export default function useGetAllRecruiterJobs() {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllRecruiterJobs = async() => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get-admin-jobs`, {
                    withCredentials: true,
                })
                if(res.data.success) {
                    dispatch(setRecruiterJobs(res.data.jobs))
                }
            } catch (error) {
                toast.error(error.response.data.message)
            }
        }
        fetchAllRecruiterJobs();
    }, [])
}
