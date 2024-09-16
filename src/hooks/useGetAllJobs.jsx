import { setJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constants'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'


export default function useGetAllJobs() {
    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(store=>store.job);
    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get-all-jobs?keyword=${searchedQuery}`, {
                    withCredentials: true,
                })
                if(res.data.success) {
                    dispatch(setJobs(res.data.jobs))
                }
            } catch (error) {
                toast.error(error.response.data.message)
            }
        }
        fetchAllJobs();
    }, [])
}
