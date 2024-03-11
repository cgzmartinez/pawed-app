import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function Layout() {
  return (
    <div className="py-4 px-10 flex flex-col min-h-screen">
      <Navbar />
      <Outlet />
    </div>
  )
}
