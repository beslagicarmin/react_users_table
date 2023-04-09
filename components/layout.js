import Link from "next/link"
import { useRouter } from "next/router"

export default function Layout({ children }) {
  const router = useRouter()

  return (
    <>
      <div>
        <h1>Users</h1>
        <nav className="header-nav">
          <ul>
            <li>
              <Link className={router.pathname == "/" ? "active" : ""} href="/">
                Table of users
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      {children}
      <div className="site-footer">
        <p>Footer text, all rights reserved &copy;</p>
      </div>
    </>
  )
}