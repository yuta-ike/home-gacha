import { createRootRoute,Outlet } from '@tanstack/react-router'
import { Toast, ToastProvider } from '../components/ui/toast'
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <ToastProvider><div className='h-screen w-full bg-[#F5F5F5]'>
      <Outlet />
      <Toast />
      {/* <TanStackRouterDevtools /> */}
    </div></ToastProvider>
  ),

})
