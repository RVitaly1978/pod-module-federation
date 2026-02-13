import { Link } from 'react-router-dom'
import reactLogo from '../assets/react.png'

export function Component () {
  return (
    <>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <img width="300" src={reactLogo} className="rounded-xl border-information-500 border-5" />

        <Link to="/app-react/page1" className="mt-8 border-2 border-information-500 text-information-500 font-bold text-xl px-4 py-2 rounded-md">
          Link to Page 1
        </Link>
      </div>
    </>
  )
}
