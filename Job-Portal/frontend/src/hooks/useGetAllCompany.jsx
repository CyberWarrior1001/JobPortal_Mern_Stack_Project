import { setCompanies } from '@/redux/companySlice'
import { COMPANY_API_END_POINT} from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function useGetAllCompanies() {
    const dispatch = useDispatch()
    useEffect(() => {
      const fatchCompanies = async () => {
        try {
            const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {withCredentials:true})
            console.log(res)
            if(res.data.success){
              console.log("companies fatched!!")

                dispatch(setCompanies(res.data.companies))
                console.log("Companies dispatched")
                console.log(res.data.companies)
                
            }
        } catch (error) {
            console.log(error) 
            console.log('Error occur in getting companies')
        }
        
      }
      fatchCompanies();

    }, [])
    
}

export default useGetAllCompanies
