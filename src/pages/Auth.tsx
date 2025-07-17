
import "../assets/css/login.css"
import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form"
import { commonApiRequest } from "../utils/commonUtils";
import { useDispatch } from "react-redux";
import { updateLogin } from "../redux/slices/AuthSlice";
import { useNavigate } from "react-router-dom"
import { AxiosError } from "axios";
import useAuthCheck from "../hooks/useAuthCheck";


//Regiter schema
const RegisterSchema = z.object({
  userName: z.string().min(3, "username must be more than 3 long"),
  email: z.string().email("invalid email"),
  password: z.string()
    .min(6, "Password must be at least 6 long")
    .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[a-zA-Z]).{6,}$/, "Password must be alphanumeric and include at least one uppercase letter"),
});

//LoginSchema
const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

interface UserCredentials {
  email: string;
  password: string;
  userName?: string;
}



function Auth() {

  useAuthCheck()

  const {register,handleSubmit,formState: {errors}} = useForm<z.infer<typeof RegisterSchema>>({resolver:zodResolver(RegisterSchema)})
  const { register: registerLogin, handleSubmit: handleSubmitLogin, formState: { errors: loginErrors }} = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const registerSubmithandler = async(data: UserCredentials) => {

    const registerResponse = await commonApiRequest.post("auth/public/register",data)

    console.log(registerResponse);
    
  }

  const loginSubmithandler = async(data : UserCredentials) =>{

    try {

      const loginRsponse = await commonApiRequest.post("auth/login",data)


      if(loginRsponse?.data?.status == "Success"){

        dispatch(updateLogin({isLoggedIn: true}))
  
        navigate("/")
  
      }else{
        alert(loginRsponse?.data?.message)
      }
    } catch (error) {
      alert(error instanceof AxiosError ?  error?.response?.data?.message : "somethings went wrong")
    }
    
    
    
   
    
  }

  console.log(loginErrors)



  return (
    <div className="main">  	
  <input type="checkbox" id="chk" aria-hidden="true" />
  <div className="signup">
    <form onSubmit={handleSubmit(registerSubmithandler)}>
      <label htmlFor="chk" aria-hidden="true">Sign up</label>
      <input type="text" {...register('userName')} name="userName" placeholder="User name"  />
      {errors.userName && <span className="input_error">{(errors.userName as any).message}</span>}
      <input type="email" {...register('email')} name="email" placeholder="Email"  />
      {errors.email && <span className="input_error">{(errors.email as any).message}</span>}
      <input type="password" {...register('password')} name="password" placeholder="Password"  />
      {errors.password && <span className="input_error">{(errors.password as any).message}</span>}
      <button type="submit">Sign up</button>
    </form>
  </div>
  <div className="login">
    <form onSubmit={handleSubmitLogin(loginSubmithandler)}>
      <label htmlFor="chk" aria-hidden="true">Login</label>
      <input type="email" {...registerLogin('email')} name="email" placeholder="Email" />
      {loginErrors.email && <span className="input_error">{(loginErrors.email as any).message}</span>}
      <input type="password" {...registerLogin('password')} name="password" placeholder="Password" />
      {loginErrors.password && <span className="input_error">{(loginErrors.password as any).message}</span>}
      <button type="submit">Login</button>
    </form>
  </div>
</div>

  )
}

export default Auth