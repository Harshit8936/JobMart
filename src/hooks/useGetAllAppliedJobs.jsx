import { setAppliedJobs } from '@/redux/jobSlice';
import { APPLICATION_API_END_POINT } from '@/utils/constants';
import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner';

export default function useGetAllAppliedJobs() {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchApplidJobs = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get-applied-jobs`, {
                    withCredentials: true
                })
                if (res.data.success) {
                    dispatch(setAppliedJobs(res.data.applications))
                }
            } catch (error) {
                toast.error(error.response.data.message)
            }

        }
        fetchApplidJobs();
    }, [])
}
