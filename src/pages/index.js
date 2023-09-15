import * as React from "react"
import AdminPanel from "../components/AdminPanel"
import "../style/style.scss"

const IndexPage = () => {
  return (
    <main>
    <AdminPanel />
    </main>
  )
}

export default IndexPage

export const Head = () => <title>Admin UI</title>
