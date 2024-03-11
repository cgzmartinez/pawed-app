import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import mascot from '../assets/pawed-mascot.svg'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  async function registerUser(ev) {
    ev.preventDefault()
    console.log({ name, email, password }) // Optional: Log data before request
    try {
      await axios.post('/register', {
        name,
        email,
        password,
      })
      alert('Registration successful. Sign in to continue')
    } catch (e) {
      alert('Registration failed. Please try again')
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
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
          <button className="primary">Register</button>
          <div className="text-center text-gray-500 py-2">
            Already registered?
            <Link
              className="p-1 hover:underline hover:text-primary font-bold"
              to={'/login'}
            >
              Sign In
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
