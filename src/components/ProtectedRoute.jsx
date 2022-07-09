import React from 'react'

const useAuth = ()=>{
    const user={loggedIn:false};
    return user && user.loggedIn;
}

const ProtectedRoute = () => {
    const isAuth=useAuth();
  return (
    <div>ProtectedRoute</div>
  )
}

export default ProtectedRoute