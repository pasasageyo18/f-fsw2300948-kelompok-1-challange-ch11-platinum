import NavbarSect from '../components/Navbar'

export default function HomeLayout({ children }) {
  return (
    <>
      <NavbarSect />
      <main>{children}</main>
    </>
  )
}
