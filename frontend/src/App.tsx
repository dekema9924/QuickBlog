import Header from "./components/Header"
import About from "./pages/About"
import './styles/styles.css'
import Blogs from "./pages/Blogs"


function App() {
  return (
    <>
      <div className="w-11/12 m-auto ">
        <Header />
        <div className="mt-20 w-11/12 m-auto ">
          <About />
          <Blogs />
        </div>

      </div>
    </>
  )
}

export default App
