import { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import { Navigate, useParams } from 'react-router-dom'
import axios from 'axios'
import PlacesPage from './PlacesPage'
import AccountNav from '../AccountNav'
import ProfilePet from '../assets/mascot-profile.svg?react'

export default function ProfilePage() {
  const [redirect, setRedirect] = useState(null)
  const { ready, user, setUser } = useContext(UserContext)

  let { subpage } = useParams()
  if (subpage === undefined) {
    subpage = 'profile'
  }

  async function logout() {
    await axios.post('/logout')
    setRedirect('/')
    setUser(null)
  }

  if (!ready) {
    return 'loading...'
  }

  if (ready && !user && !redirect) {
    return <Navigate to={'/login'} />
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }
  return (
    <div>
      <AccountNav />
      {subpage === 'profile' && (
        <div className="flex items-center justify-center text-center max-w-lg mx-auto px-20">
          <div className="rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] py-[50px] px-[90px]">
            <div className="bg-primary/50 flex outline outline-primary outline-4 items-center justify-center rounded-full h-[120px] w-[120px] max-w-[125px] mb-5 mx-10">
              <ProfilePet className="object-cover rounded-full h-[120px] pt-2" />
            </div>
            <div className="mb-2">Hello, {user.name}</div>
            <div className="font-thin">Logged in with ({user.email})</div>
            <br />
            <button onClick={logout} className="primary max-w-sm mt-2">
              Logout
            </button>
          </div>
        </div>
      )}
      {subpage === 'places' && <PlacesPage />}
    </div>
  )
}
