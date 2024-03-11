export default function AddressLink({ children, className = null }) {
  if (!className) {
    className = 'inline-block my-3'
  }
  className += 'text-2xl gap-1 font-medium no-underline hover:underline'
  return (
    <a
      className={className}
      target="_blank"
      href={'https://maps.google.com/?q=' + children}
    >
      {children}
    </a>
  )
}
