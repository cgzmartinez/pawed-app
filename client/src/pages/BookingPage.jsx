import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PlaceGallery from '../PlaceGallery'
import AddressLink from '../AddressLink'
import BookingDates from '../BookingDates'
import axios from 'axios'

export default function BookingPage() {
  const { id } = useParams()
  const [booking, setBooking] = useState(null)
  useEffect(() => {
    if (id) {
      axios.get('/bookings').then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id)
        if (foundBooking) {
          setBooking(foundBooking)
        }
      })
    }
  }, [id])

  if (!booking) {
    return ''
  }

  return (
    <div className="mt-8">
      <h1 className="text-3xl mb-3">{booking.place.title}</h1>
      <div className="bg-gray-200 p-6 mb-4 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-lg font-light">Your booking details:</h2>
          <BookingDates booking={booking} />
        </div>
        <div className="bg-gradient-to-r from-primary to-teal-500 grid grid-rows-2 p-6 text-white rounded-2xl">
          <div className="font-semibold text-">Total price</div>
          <div className="font-bold text-2xl">${booking.price}</div>
        </div>
      </div>
      <PlaceGallery place={booking.place} />
      <div className="my-4">
        <AddressLink>{booking.place.address}</AddressLink>
      </div>
    </div>
  )
}
