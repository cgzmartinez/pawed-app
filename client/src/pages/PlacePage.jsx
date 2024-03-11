import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BookingWidget from '../BookingWidget'
import axios from 'axios'
import PlaceGallery from '../PlaceGallery'
import AddressLink from '../AddressLink'

export default function PlacePage() {
  const { id } = useParams()
  const [place, setPlace] = useState(null)
  const [user, setUser] = useState('')
  useEffect(() => {
    if (!id) {
      return
    }
    const fetchData = async () => {
      const placeResponse = await axios.get(`/places/${id}`)
      const ownerId = placeResponse.data.owner // Get the owner ID

      const userResponse = await axios.get(`/users/${ownerId}`) // Fetch user data

      setPlace(placeResponse.data)
      setUser(userResponse.data) // Store user data in new state
    }

    fetchData()
  }, [id])

  if (!place) return ''

  return (
    <div className="mt-8">
      <h1 className="text-3xl mb-3">{place.title}</h1>
      <PlaceGallery place={place} />
      <div className="my-4">
        <AddressLink>{place.address}</AddressLink>
      </div>
      <div className="grid grid-cols-[2fr_1fr]">
        <div>
          <div className="flex items-center mb-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-[45px] h-[45px] mr-[15px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            <div className="grid grid-rows-2">
              <h3 className="font-semibold">Hosted by {user.name}</h3>

              <p className="text-zinc-400 font-light text-sm">
                Excellent Host · 1 year hosting
              </p>
            </div>
          </div>
          <hr className="w-[375px]" />
          <div className="flex items-center my-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-10 h-10 mr-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
              />
            </svg>
            <div className="grid grid-rows-2">
              <h3 className="font-semibold">Flexible Drop Off</h3>
              <p className="text-zinc-400 font-light text-sm">
                Call ahead if you're running a little early or late.
              </p>
            </div>
          </div>
          <div className="flex items-center my-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-9 h-9 ml-[2px] mr-[22px]"
              viewBox="0 0 512 512"
            >
              <path d="M4.1 38.2C1.4 34.2 0 29.4 0 24.6C0 11 11 0 24.6 0H133.9c11.2 0 21.7 5.9 27.4 15.5l68.5 114.1c-48.2 6.1-91.3 28.6-123.4 61.9L4.1 38.2zm503.7 0L405.6 191.5c-32.1-33.3-75.2-55.8-123.4-61.9L350.7 15.5C356.5 5.9 366.9 0 378.1 0H487.4C501 0 512 11 512 24.6c0 4.8-1.4 9.6-4.1 13.6zM80 336a176 176 0 1 1 352 0A176 176 0 1 1 80 336zm184.4-94.9c-3.4-7-13.3-7-16.8 0l-22.4 45.4c-1.4 2.8-4 4.7-7 5.1L168 298.9c-7.7 1.1-10.7 10.5-5.2 16l36.3 35.4c2.2 2.2 3.2 5.2 2.7 8.3l-8.6 49.9c-1.3 7.6 6.7 13.5 13.6 9.9l44.8-23.6c2.7-1.4 6-1.4 8.7 0l44.8 23.6c6.9 3.6 14.9-2.2 13.6-9.9l-8.6-49.9c-.5-3 .5-6.1 2.7-8.3l36.3-35.4c5.6-5.4 2.5-14.8-5.2-16l-50.1-7.3c-3-.4-5.7-2.4-7-5.1l-22.4-45.4z" />
            </svg>
            <div className="grid grid-rows-2">
              <h3 className="font-semibold">{user.name} is a SuperSitter</h3>
              <p className="text-zinc-400 font-light text-sm">
                SuperSitters are experienced, highly rated sitters.
              </p>
            </div>
          </div>
          <div className="flex items-center my-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-9 h-9 ml-1 mr-[20.5px]"
              viewBox="0 0 512 512"
            >
              <path d="M257.5 27.6c-.8-5.4-4.9-9.8-10.3-10.6v0c-22.1-3.1-44.6 .9-64.4 11.4l-74 39.5C89.1 78.4 73.2 94.9 63.4 115L26.7 190.6c-9.8 20.1-13 42.9-9.1 64.9l14.5 82.8c3.9 22.1 14.6 42.3 30.7 57.9l60.3 58.4c16.1 15.6 36.6 25.6 58.7 28.7l83 11.7c22.1 3.1 44.6-.9 64.4-11.4l74-39.5c19.7-10.5 35.6-27 45.4-47.2l36.7-75.5c9.8-20.1 13-42.9 9.1-64.9v0c-.9-5.3-5.3-9.3-10.6-10.1c-51.5-8.2-92.8-47.1-104.5-97.4c-1.8-7.6-8-13.4-15.7-14.6c-54.6-8.7-97.7-52-106.2-106.8zM208 144a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM144 336a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm224-64a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
            </svg>

            <div className="grid grid-rows-2">
              <h3 className="font-semibold">Treats!</h3>
              <p className="text-zinc-400 font-light text-sm">
                This sitter offers free, all natural treats for your pet.
              </p>
            </div>
          </div>
          <hr className="w-[375px]" />
          <div className="my-6">
            <div className="p-1 pr-10 text-[16px] text-zinc-600 font-light">
              <h3>{place.description}</h3>
            </div>
          </div>
          <hr className="w-[375px]" />
          <div className="my-6 text-left">
            <h3 className="text-xl font-medium mb-2">
              Safety & Property Rules
            </h3>
            <p className="text-[16px] font-light text-zinc-600">
              {place.extraInfo}
            </p>
          </div>
          <hr className="w-[375px]" />
        </div>
        <BookingWidget place={place} />
      </div>
    </div>
  )
}
