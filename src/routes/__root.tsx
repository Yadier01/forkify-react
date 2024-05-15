import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <div className="flex bg-gradient-to-r from-[#f8d087] to-[#f6a984] items-center w-full min-h-screen justify-center">
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
})
