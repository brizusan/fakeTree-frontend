import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/api";
import { Navigate } from "react-router-dom";
import { Header, Profile } from "../components";


export default function AppLayout() {

  const {data:user , isLoading , isError } = useQuery({
    queryFn: getUser,
    queryKey: ['user'],
    retry: 2
  })



  if(isLoading){
    return <h1>Loading...</h1>
  }

  if(isError){
    return <Navigate to="/auth/login" />
  }

  
  if(user) return (
    <>
      <Header />
      <Profile 
        user={user}
      />
    </>
  )
}
