import { createRootRoute,Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <div className='h-screen w-full bg-[#F5F5F5]'>
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),

})
