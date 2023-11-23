import NavbarSect from '../components/Navbar'

export default function ProfileLayout({ children }) {
  return (
    <>
      <NavbarSect />
      <main className="flex justify-center">{children}</main>
    </>
  )
}
