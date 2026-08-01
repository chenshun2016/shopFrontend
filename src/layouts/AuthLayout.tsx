import { Outlet } from 'react-router-dom';

function AuthLayout(){
  return (
    <div>
      权限1111
      <Outlet />
    </div>
  )
}

export default AuthLayout;