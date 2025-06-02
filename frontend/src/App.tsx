import Header from "./components/Header"
import './styles/styles.css'
import Blogs from "./pages/Blogs"
import { Routes, Route } from 'react-router-dom'
import BlogDetails from "./pages/BlogDetails"
import { useModalContext } from "./context/ModalContext"
import AddPost from "./pages/AddPost"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import { Toaster } from 'react-hot-toast';
import useGetUser from "./hooks/useGetUser"
import Profile from "./pages/Profile"
import { ProtectedRoutes } from "./ProtectiveRoutes/ProtectedRoute"
import { NormalRoutes } from "./ProtectiveRoutes/ProtectedRoute"
import MembersPosts from "./pages/MembersPosts"

function App() {

  useGetUser()

  const { isModalOpen } = useModalContext()

  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      <div className="md:w-11/12 m-auto flex flex-col md:gap-10">
        <Header />
        <div className=" m-auto md:w-10/12 w-11/12 p-2 md:p-0  ">
          {
            isModalOpen ? <AddPost /> :
              <>
                <Routes>
                  <Route path="/" element={<Blogs />} />
                  <Route path="/blog/:id" element={<BlogDetails />} />
                  <Route path="/memberspost" element={<MembersPosts />} />



                  {/* Routes for NOT logged-in users */}
                  <Route element={<NormalRoutes />}>
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                  </Route>

                  {/* Routes for logged-in users */}
                  <Route element={<ProtectedRoutes />}>
                    <Route path="/profile" element={<Profile />} />

                  </Route>
                </Routes>
              </>
          }
        </div>

      </div>
    </>
  )
}

export default App
