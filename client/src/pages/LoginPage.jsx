import { Link, Navigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import axios from 'axios'
import { UserContext } from '../UserContext'
import mascot from '../assets/pawed-mascot.svg'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState('')
  const { setUser } = useContext(UserContext)
  async function handleLoginSubmit(ev) {
    ev.preventDefault()
    try {
      const { data } = await axios.post('/login', { email, password })
      setUser(data)
      alert('Login successful')
      setRedirect(true)
    } catch (e) {
      alert('Login failed')
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="fluffy@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary">Login</button>
          <div className="text-center text-gray-500 py-2">
            Don't have an account yet?
            <Link
              className="p-1 hover:underline hover:text-primary font-bold"
              to={'/register'}
            >
              Register Now
            </Link>
          </div>
        </form>
      </div>
      <div className="fixed bottom-0 w-auto md:mx-[200px] lg:mx-[300px]">
        <img src={mascot} alt="" />
      </div>
    </div>
  )
}
