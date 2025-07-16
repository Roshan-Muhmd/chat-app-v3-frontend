import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { useLocation, useNavigate } from "react-router-dom"
import { commonApiRequest } from "../utils/commonUtils"
import { updateLogin } from "../redux/slices/AuthSlice"

function useAuthCheck() {

const isLoggedIn = useSelector((state: RootState)=> state.auth.isLoggedIn) 
const navigate = useNavigate()
const dispatch = useDispatch()
const location = useLocation()
   

useEffect(() => {

   (async() => {

        if(isLoggedIn){
           return true
        }else{
         try {
            
            const checktokenStatus = await commonApiRequest.get("auth/checkToken",{
               withCredentials: true,  // Make sure cookies are included in the GET request
             })
      
             if(checktokenStatus?.data){
                  dispatch(updateLogin({isLoggedIn:true,userData: checktokenStatus?.data.data}))

                  if(location.pathname.includes("login")){
                     navigate("/")
                  }
             }else{
               navigate("/login")
             }
         } catch (error) {
            navigate("/login")
         }
         

        
        }
       
   })()
  
   

   
}, [])


}

export default useAuthCheck