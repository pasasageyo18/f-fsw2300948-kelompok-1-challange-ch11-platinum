import NavbarSect from '../components/Navbar'

export default function HomeLayout({ children }) {
  return (
    <>
      <NavbarSect gameList={true} />
      <main>{children}</main>
    </>
  )
}
