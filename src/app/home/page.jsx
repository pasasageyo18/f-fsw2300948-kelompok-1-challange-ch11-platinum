import Image from 'next/image'
import Gallery from '../components/Gallery'
import Link from 'next/link'

export default function Page() {
  return (
    <>
      <div className="container ml-64 mt-10 flex gap-2">
        <Link className="text-blue-500" href="home">
          Homepage
        </Link>
      </div>
      <div className="flex justify-center my-5 w-full items-center animate__animated animate__fadeInUp">
        <div className="shadow-md w-1/2 rounded dark:bg-black dark:shadow-md dark:shadow-black bg-white">
          <div className="flex flex-col align-center items-center p-4">
            <div className="w-full">
              <div className="mb-10 h-56 flex relative">
                <Image
                  alt="rps.jpg"
                  fill={true}
                  objectFit="cover"
                  src="/images/game.jpg"
                />
              </div>
              <h1 className="text-black dark:text-white font-extrabold text-5xl mb-5">
                Welcome to gaming website!
              </h1>
              <p className="text-black dark:text-white text-justify">
                Welcome to GameHub, your one-stop online gaming destination!
                Enjoy a variety of games for all ages and interests. Whether
                you&lsquo;re into strategy, action, or puzzles, we&lsquo;ve got
                you covered. Compete with friends or go solo in a user-friendly,
                social gaming experience. Join the fun at GameHub and let the
                games begin!
              </p>
              <p className="text-black dark:text-white text-justify">
                With a user-friendly interface and seamless navigation, our
                website makes it easy to discover and enjoy your favorite games.
                From classic card games like Solitaire to action-packed
                adventures that will keep you on the edge of your seat, our
                library is constantly expanding to ensure there&lsquo;s always
                something new to try.
              </p>
              <p className="text-black dark:text-white text-justify">
                So, what are you waiting for? Join the fun at GameHub and let
                the games begin! Whether you have a few minutes to spare or want
                to embark on an epic gaming marathon, we&lsquo;ve got you
                covered. Play, explore, and conquer – all in one convenient
                place.
              </p>
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col-6 d-flex justify-content-center">
                <Gallery />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
