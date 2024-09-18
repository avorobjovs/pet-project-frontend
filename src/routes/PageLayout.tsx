import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar"

function PageLayout() {
  return (
    <>
      <NavBar />
      <div className="container my-5">
        <Outlet />
      </div>
    </>
  )
}

export default PageLayout