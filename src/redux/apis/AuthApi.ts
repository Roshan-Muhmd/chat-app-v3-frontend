import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


interface ResponseObj {
    [key: string] : any
} 

const AuthApi = createApi({
    reducerPath: 'AuthApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }), 
    endpoints: (builder) => ({
      doLogin: builder.mutation<ResponseObj, ResponseObj>({
        query: (loginParams) => ({
          url: '/login', 
          body: loginParams,
        }),
      }),
      doRegister: builder.mutation<ResponseObj, ResponseObj>({
        query: (registerParams) => ({
          url: '/register', 
          method: 'POST',
          body: registerParams,
        }),
      }),
    }),
  });

  export const {useDoLoginMutation,useDoRegisterMutation} = AuthApi

  export default AuthApi