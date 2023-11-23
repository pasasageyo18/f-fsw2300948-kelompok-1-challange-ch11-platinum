import NavbarSect from '../components/Navbar'

export default function GameLayout({ children }) {
  return (
    <>
      <NavbarSect />
      <main>{children}</main>
    </>
  )
}
