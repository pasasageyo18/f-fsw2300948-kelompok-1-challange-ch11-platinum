import NavbarSect from '../components/Navbar'

export default function UserListLayout({ children }) {
  return (
    <>
      <NavbarSect userList={true} />
      <main className="flex justify-center flex-col">{children}</main>
    </>
  )
}
