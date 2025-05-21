import Header from "./components/Header"
import './styles/styles.css'
import Blogs from "./pages/Blogs"
import { Routes, Route } from 'react-router-dom'
import BlogDetails from "./pages/BlogDetails"
import { useModalContext } from "./context/ModalContext"
import AddPost from "./pages/AddPost"


function App() {
  const { isModalOpen } = useModalContext()

  return (
    <>
      <div className="md:w-11/12 m-auto flex flex-col md:gap-10">
        <Header />
        <div className=" m-auto md:w-10/12 w-11/12 p-2 md:p-0  ">
          {
            isModalOpen ? <AddPost /> :
              <>
                <Routes>
                  <Route path="/" element={<Blogs />} />
                  <Route path="/blog/:id" element={<BlogDetails />} />
                </Routes>
              </>
          }

        </div>

      </div>
    </>
  )
}

export default App
