import { NavLink, Outlet } from "react-router-dom"

function PageLayout() {
  return (
    <div>
      <div>
        <nav>
          <NavLink
            to={'/'}
            className={({ isActive, isPending }) =>
              isActive
                ? "active"
                : isPending
                ? "pending"
                : ""
            }
          >
            Main    
          </NavLink>
          &nbsp;
          <NavLink
            to={'/about'}
            className={({ isActive, isPending }) =>
              isActive
                ? "active"
                : isPending
                ? "pending"
                : ""
            }
          >
            About    
          </NavLink>
        </nav>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default PageLayout