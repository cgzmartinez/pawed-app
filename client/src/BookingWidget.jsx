import { useState } from 'react'
import { differenceInCalendarDays } from 'date-fns'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [numberOfGuests, setNumberOfGuests] = useState(1)
  const [petName, setPetName] = useState('')
  const [phone, setPhone] = useState('')
  const [redirect, setRedirect] = useState('')

  let numberOfNights = 0
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    )
  }

  async function bookPlace() {
    const response = await axios.post('/bookings', {
      checkIn,
      checkOut,
      numberOfGuests,
      petName,
      phone,
      place: place._id,
      price: numberOfNights * place.price,
    })
    const bookingId = response.data._id
    setRedirect(`/account/bookings/${bookingId}`)
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }

  return (
    <div>
      <div className="shadow-lg p-6 outline outline-1 outline-zinc-300 rounded-2xl">
        <div className="text-lg font-extralight text-left mb-5">
          <span className="text-xl font-medium">${place.price}</span> night
        </div>
        <div className="relative text-[10px] text-left font-bold">
          <div className="m-2 mb-6 grid grid-cols-1 outline outline-1 outline-zinc-400 overflow-hidden rounded-xl">
            <div className="grid grid-cols-2 outline outline-1 outline-zinc-400">
              <div className="grid grid-cols-1 aspect-auto w-full outline outline-1 outline-zinc-400 object-cover overflow-hidden p-3">
                <label>CHECK-IN</label>
                <input
                  className="w-auto"
                  type="date"
                  value={checkIn}
                  onChange={(ev) => setCheckIn(ev.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 aspect-auto w-full object-cover p-3">
                <label>CHECKOUT</label>
                <input
                  className="w-auto"
                  type="date"
                  value={checkOut}
                  onChange={(ev) => setCheckOut(ev.target.value)}
                />
              </div>
            </div>
            <div className="col-span-full aspect-auto w-full object-cover p-3">
              <div className="mb-2">
                <label>GUESTS</label>
                <input
                  type="number"
                  value={numberOfGuests}
                  onChange={(ev) => setNumberOfGuests(ev.target.value)}
                />
              </div>
              {numberOfNights > 0 && (
                <div>
                  <div>
                    <label>PET NAMES</label>
                    <input
                      type="text"
                      value={petName}
                      placeholder="Bella"
                      onChange={(ev) => setPetName(ev.target.value)}
                    ></input>
                  </div>
                  <div>
                    <label>PHONE</label>
                    <input
                      type="tel"
                      value={phone}
                      placeholder="123-456-7890"
                      onChange={(ev) => setPhone(ev.target.value)}
                    ></input>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={bookPlace}
              className="text-white text-base font-normal bg-gradient-to-r from-primary to-teal-500 rounded-xl py-4 px-[55px]"
            >
              BOOK
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 items-center mt-5 ">
          <h3 className="text-sm font-semibold">
            Total&nbsp;before&nbsp;taxes
          </h3>
          <h3 className="text-right">
            {numberOfNights > 0 && (
              <h3 className="font-semibold">${numberOfNights * place.price}</h3>
            )}
          </h3>
        </div>
      </div>
    </div>
  )
}
