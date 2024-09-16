import { setSingleCompany } from '@/redux/companySlice'
import { COMPANY_API_END_POINT } from '@/utils/constants'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'


export default function useCompanyById(companyId) {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchSingleCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get-company/${companyId}`, {
                    withCredentials: true,
                })
                if(res.data.success) {
                    dispatch(setSingleCompany(res.data.company))
                }
            } catch (error) {
                toast.error(error.response.data.message)
            }
        }
        fetchSingleCompany();
    }, [companyId,dispatch])
}