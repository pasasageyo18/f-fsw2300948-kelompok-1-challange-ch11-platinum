import NavbarSect from '../components/Navbar'

export default function HomeLayout({ children }) {
  return (
    <>
      <NavbarSect home={true} />
      <main className="flex flex-col justify-center">{children}</main>
    </>
  )
}
