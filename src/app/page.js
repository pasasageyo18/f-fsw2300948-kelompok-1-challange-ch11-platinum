import NavbarSect from './components/Navbar'

export default function Home() {
  return (
    <>
      <NavbarSect />
      <main className="flex justify-center items-center my-96">
        <div className="w-full h-full justify-center items-center">
          <div className="flex flex-col">
            <div className="text-center">
              <h1 className="text-dark dark:text-white animate__animated animate__fadeInUp">
                Welcome to Kelompok 1 <br />
                Fullstack Web Development 34
              </h1>
              <p className="text-dark dark:text-white animate__animated animate__fadeInUp animate__delay-1s">
                Project ini dibuat dengan bangga oleh kami
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
