export default function PlaceImg({ place, index = 0, className = null }) {
  if (!place.photos?.length) {
    return ''
  }
  if (!className) {
    className = 'object-cover w-full'
  }
  return (
    <img
      className={className}
      src={'http://localhost:5173/uploads/' + place.photos[index]}
      alt="Accomodation image"
    />
  )
}
