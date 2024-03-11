import errormascot from '../assets/error-mascot.svg'
export default function ErrorPage() {
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32 mt-10">
        <h1 className="text-[60px] font-bold text-center mb-4">Uh Oh...</h1>
        <div className="max-w-md justify-center flex mx-auto">
          <img
            className="w-[300px] h-[300px] mb-4"
            src={errormascot}
            alt="404 mascot"
          />
        </div>
        <div>
          <h3 className="text-[60px] font-bold text-center mb-4">404</h3>
          <p className="text-lg font-medium text-center">PAGE NOT FOUND</p>
        </div>
      </div>
    </div>
  )
}
