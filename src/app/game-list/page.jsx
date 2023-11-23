'use client'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { db } from '../store/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { isPlayed } from '../redux/playAgain/playAgain'
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Image,
  Link,
} from '@nextui-org/react'

export default function Page() {
  const [score, setScore] = useState(null)

  const dispatch = useDispatch()
  const selectPlayed = (state) => state.played.played;
  const played = useSelector(selectPlayed);


  // check if player has played the game

  useEffect(() => {
    const checkIfPlayedGame = async () => {
      try {
        const currentUserCollectionId = localStorage.getItem('currentUserUid')

        const userDocRef = doc(db, 'users', currentUserCollectionId)

        const userDocSnapshot = await getDoc(userDocRef)

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data()
          if (userData.total_score > 0) {
            dispatch(isPlayed())
            setScore(userData.total_score)
          }
        }
      } catch (error) {
        console.error(
          'Error checking if the player has played the game:',
          error
        )
      }
    }
    checkIfPlayedGame()
  }, [dispatch])

  return (
    <>
      <div className="container ml-64 mt-10 flex gap-2">
        <Link aria-current="page" href="game-list">
          Game List
        </Link>
      </div>
      <div className="container mx-auto">
        <div className=" mt-10 bg-white shadow-lg py-16 rounded-lg dark:bg-black dark:shadow-md dark:shadow-black animate__animated animate__fadeInUp">
          <div className="flex items-center justify-center flex-wrap animate__animated animate__fadeInUp">
            <div className="w-full flex flex-col justify-center mb-6 animate__animated animate__fadeInUp">
              <p className="text-center text-4xl font-bold mb-3">Game List</p>
              <p className="text-center text-xl font-semibold">
                Here&lsquo;s all game that you can play!
              </p>
            </div>
            <div className="md:mb-3 animate__animated animate__fadeInUp">
              <Card
                className="w-full h-[300px] col-span-12 sm:col-span-5 md:mb-3"
                isFooterBlurred
              >
                <CardHeader className="absolute z-10 top-1 flex-col items-start">
                  <div className="p-3 bg-white dark:bg-black rounded-md">
                    <p className="font-semibold text-xl text-black dark:text-white">
                      Score: 0
                    </p>
                  </div>
                </CardHeader>
                <Image
                  alt="Card example background"
                  className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                  removeWrapper
                  src="/images/roullete.avif"
                />
                <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-evenly">
                  <Button
                    as={Link}
                    className="text-tiny"
                    color="primary"
                    href="#"
                    radius="full"
                    size="sm"
                  >
                    <p>Play</p>
                  </Button>
                  <Button
                    as={Link}
                    className="text-tiny"
                    color="primary"
                    href="#"
                    radius="full"
                    size="sm"
                  >
                    Detail Game
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div className="mx-4 md:mb-3 animate__animated animate__fadeInUp animate__delay-1s">
              <Card
                className="w-full h-[300px] col-span-12 sm:col-span-5"
                isFooterBlurred
              >
                <CardHeader className="absolute z-10 top-1 flex-col items-start">
                  <div className="p-3 bg-white dark:bg-black rounded-md">
                    <p className="font-semibold text-xl text-black dark:text-white">
                      Score: {score}
                    </p>
                  </div>
                </CardHeader>
                <Image
                  alt="Card example background"
                  className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                  removeWrapper
                  src="/images/rps.avif"
                />
                <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-evenly">
                  {played ? (
                    <Button
                      as={Link}
                      className="text-tiny"
                      color="danger"
                      href="/game-play"
                      radius="full"
                      size="sm"
                    >
                      <p>Play Again</p>
                    </Button>
                  ) : (
                    <Button
                      as={Link}
                      className="text-tiny"
                      color="primary"
                      href="/game-play"
                      radius="full"
                      size="sm"
                    >
                      <p>Play</p>
                    </Button>
                  )}
                  <Button
                    as={Link}
                    className="text-tiny"
                    color="primary"
                    href="/game-detail"
                    radius="full"
                    size="sm"
                  >
                    Detail Game
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div className="md:mb-3 animate__animated animate__fadeInUp animate__delay-2s">
              <Card
                className="w-full h-[300px] col-span-12 sm:col-span-5"
                isFooterBlurred
              >
                <CardHeader className="absolute z-10 top-1 flex-col items-start"></CardHeader>
                <Image
                  alt="Card example background"
                  className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                  removeWrapper
                  src="/images/vr.avif"
                />
                <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-center">
                  <div>
                    <p className="text-black text-tiny">Available soon.</p>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
