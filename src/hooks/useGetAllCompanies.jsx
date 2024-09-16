import { setCompanies } from '@/redux/companySlice'
import { COMPANY_API_END_POINT } from '@/utils/constants'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'


export default function useGetAllCompanies() {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllCompanies = async() => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get-companies`, {
                    withCredentials: true,
                })
                if(res.data.success) {
                    dispatch(setCompanies(res.data.companies))
                }
            } catch (error) {
                toast.error(error.response.data.message)
            }
        }
        fetchAllCompanies();
    }, [])
}
