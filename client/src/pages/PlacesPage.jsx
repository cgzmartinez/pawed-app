import { Link } from 'react-router-dom'
import AccountNav from '../AccountNav'
import { useEffect, useState } from 'react'
import axios from 'axios'
import PlaceImg from '../PlaceImg'
import NoPlace from '../assets/no-place.svg?react'

export default function PlacesPage() {
  const [places, setPlaces] = useState([])
  useEffect(() => {
    axios.get('/user-places').then(({ data }) => {
      setPlaces(data)
    })
  }, [])
  return (
    <div>
      <AccountNav />
      <div className="text-center">
        <Link
          className="inline-flex gap-1 bg-primary text-white py-2 px-4 rounded-full"
          to={'/account/places/new'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new place
        </Link>
      </div>
      <div className="mt-4">
        {places.length > 0 ? (
          places.map((place) => (
            <Link
              to={'/account/places/' + place._id}
              key="place"
              className="flex cursor-pointer hover:scale-105 duration-100 mb-8 gap-4 bg-gray-200 p-4 rounded-2xl"
            >
              <div className="flex rounded-lg w-32 h-32 bg-gray-300 shrink-0">
                <PlaceImg place={place} />
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl font-bold">{place.title}</h2>
                <p className="text-sm mt-2">{place.description}</p>
              </div>
            </Link>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center">
            <NoPlace className="w-[200px] h-[200px] mt-4" />
            <h3 className="text-xl mt-4">No places added yet.</h3>
            <p className="text-gray-500 text-sm">
              Start adding places to create your own collection.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
