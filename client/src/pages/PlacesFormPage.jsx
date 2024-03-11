import Skills from '../Skills'
import Home from '../Home'
import PhotosUploader from '../PhotosUploader'
import { useEffect, useState } from 'react'
import AccountNav from '../AccountNav'
import { Navigate, useParams } from 'react-router-dom'
import axios from 'axios'

export default function PlacesFormPage() {
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [address, setAddress] = useState('')
  const [addedPhotos, setAddedPhotos] = useState([])
  const [description, setDescription] = useState('')
  const [skills, setSkills] = useState([])
  const [home, setHome] = useState([])
  const [extraInfo, setExtraInfo] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [maxGuests, setMaxGuests] = useState(1)
  const [price, setPrice] = useState(30)
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    if (!id) {
      return
    }
    axios.get('/places/' + id).then((response) => {
      const { data } = response
      setTitle(data.title)
      setAddress(data.address)
      setAddedPhotos(data.photos)
      setDescription(data.description)
      setSkills(data.skills)
      setHome(data.home)
      setExtraInfo(data.extraInfo)
      setCheckIn(data.checkIn)
      setCheckOut(data.checkOut)
      setMaxGuests(data.maxGuests)
      setPrice(data.price)
    })
  }, [id])

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>
  }

  function inputDescription(text) {
    return <p className="text-gray-400 text-sm pl-1">{text}</p>
  }

  function preInput(header, description) {
    return (
      <div>
        {inputHeader(header)}
        {inputDescription(description)}
      </div>
    )
  }

  async function savePlace(ev) {
    ev.preventDefault()
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      skills,
      home,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    }
    if (id) {
      // Updates place
      await axios.put('/places', {
        id,
        ...placeData,
      })
      setRedirect(true)
    } else {
      // new place
      await axios.post('/places', placeData)
      setRedirect(true)
    }
  }

  if (redirect) {
    return <Navigate to={'/account/places'} />
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        {preInput('Title', 'Add a title for your accommodation.')}
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="title"
        />
        {preInput('Address', 'Add an address for your accommodation.')}
        <input
          type="text"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
          placeholder="address"
        />
        {preInput('Photos', 'Add some photos.')}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {preInput('Description', 'Add a description for the accommodation.')}
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        {preInput('Skills', 'Select all the skills you can provide.')}
        <div className="mt-2 grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          <Skills selected={skills} onChange={setSkills} />
        </div>
        {preInput(
          'Home',
          'Select all the home info you can provide about the accommodation.'
        )}
        <div className="mt-2 grid gap-2 grid-cols-2 md:grid-cols-4">
          <Home selected={home} onChange={setHome} />
        </div>
        {preInput('Things to know', 'House rules, etc')}
        <textarea
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
          className="mt-2"
          placeholder="Write additional information or rules you'd like pet guests to follow."
        />
        {preInput(
          'Check in & Check out times',
          'Please select check in and check out times that work for you. Set prices and max number of pets per booking.'
        )}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 mb-1">Check in time &#40;12-3pm&#41;</h3>
            <input
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
              type="text"
              placeholder="10"
            />
          </div>
          <div>
            <h3 className="mt-2 mb-1">Check out time &#40;8-11am&#41;</h3>
            <input
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
              type="text"
              placeholder="9"
            />
          </div>
          <div>
            <h3 className="mt-2 mb-1">Max number of pets per booking</h3>
            <input
              value={maxGuests}
              onChange={(ev) => setMaxGuests(ev.target.value)}
              type="number"
              placeholder="1"
            />
          </div>
          <div>
            <h3 className="mt-2 mb-1">Price per day</h3>
            <input
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
              type="number"
              placeholder="1"
            />
          </div>
        </div>
        <div className="my-4">
          <button className="primary">Save</button>
        </div>
      </form>
    </div>
  )
}
