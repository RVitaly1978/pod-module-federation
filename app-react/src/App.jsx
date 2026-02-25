import { Outlet } from 'react-router-dom'

function App () {
  const isDev = import.meta.env.DEV
  const VERSION = import.meta.env.VITE_APP_VERSION

  return (
    <>
      <div className="relative bg-information-100 text-base-white rounded-md border-5 border-information-500 flex-grow-1 p-2">
        <header className="flex justify-end">
          <div className="bg-information-500 text-base-white px-2 rounded-md">
            <p>{ isDev ? 'Dev mode' : 'App-react' }</p>
            <p>{ (isDev || !VERSION) ? 'local' : VERSION }</p>
          </div>
        </header>

        <Outlet />
      </div>
    </>
  )
}

export default App
