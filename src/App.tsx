
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainChatPage from "./pages/MainChatPage";
import Auth from "./pages/Auth";
import useAuthCheck from "./hooks/useAuthCheck";


const router = createBrowserRouter([{
  path:"/",
  element:  <MainChatPage/> 
},
{
  path:"/login",
  element:<Auth/>
}
])



function App() {

  


  return (
    <>
    <RouterProvider router={router}/>    
    </>
  )
}

export default App
