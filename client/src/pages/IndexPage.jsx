import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Image from '../Image'

export default function IndexPage() {
  const [places, setPlaces] = useState([])
  useEffect(() => {
    axios.get('/places').then((response) => {
      setPlaces(response.data)
    })
  }, [])
  return (
    <div className="mt-8 grid gap-x-6 gap-y-8  grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place) => (
          <Link to={'/place/' + place._id}>
            <div className="bg-gray-500 mb-2 rounded-2xl flex">
              {place.photos?.[0] && (
                <Image
                  className="rounded-2xl object-cover aspect-square"
                  src={place.photos?.[0]}
                  alt=""
                  key={place.title}
                />
              )}
            </div>
            <h3 className="text-medium font-medium">{place.address}</h3>
            <h2 className="text-sm text-gray-500 font-light truncate">
              {place.title}
            </h2>
            <h3 className="text-regular mt-2 font-light">
              <span className="font-medium">${place.price}</span> night
            </h3>
          </Link>
        ))}
    </div>
  )
}
