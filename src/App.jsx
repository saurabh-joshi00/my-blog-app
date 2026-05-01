import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import authService from "./appwrite/services/auth"
import { login, logout } from "./features/authentication/authSlice"
import { Header, Footer } from "./components" 
import { Outlet } from "react-router-dom"
import { Toaster } from "react-hot-toast"


function App() {
  
  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])

    return !loading ? ( 
      <div className="min-h-screen flex flex-wrap content-between bg-white">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="w-full block">
          <Header />
            <main>
              <Outlet />
            </main>
          <Footer />
        </div>
      </div>
    ) : null
}

export default App
