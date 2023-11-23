'use client'
import { useEffect, useState } from 'react'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Link,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../store/firebase'

export default function Page() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, 'users')
        const querySnapshot = await getDocs(
          query(usersRef, orderBy('total_score', 'desc'))
        )

        const userList = []
        querySnapshot.forEach((doc) => {
          userList.push(doc.data())
        })

        setUsers(userList)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    fetchUsers()
  }, [])
  return (
    <>
      <div className="container ml-64 mt-10 flex gap-2">
        <Link aria-current="page" href="game-list">
          Game List
        </Link>
        <p className="text-black dark:text-white">&gt;</p>
        <Link aria-current="page" href="game-detail">
          Game Detail
        </Link>
      </div>
      <div className="container mx-auto grid grid-cols-2 gap-8 mt-10">
        <div className="flex items-center justify-center">
          <Card
            className="border-none bg-background/60 dark:bg-default-100/50 "
            isBlurred
            shadow="sm"
          >
            <CardHeader className="justify-center">
              <h1 className="text-4xl font-bold mt-2">Game Detail</h1>
            </CardHeader>
            <CardBody>
              <div className="flex flex-col">
                <div className="h-1/2">
                  <Image
                    alt="rps"
                    className="object-cover"
                    height="100%"
                    shadow="md"
                    src="/images/rps.avif"
                    width="100%"
                  />
                </div>
                <div className="flex flex-col justify-center items-start">
                  <div className="flex flex-col text-center">
                    <h1 className="text-2xl font-semibold mt-4">
                      Rock Paper Scissors
                    </h1>
                    <p className="text-small text-foreground/150 mt-2">
                      What is the concept of Rock Paper Scissors? Each gesture
                      defeats one and is defeated by one of the other two: rock
                      defeats scissors but is defeated by paper; paper defeats
                      rock but is defeated by scissors. The person whose gesture
                      defeats the other is selected.
                    </p>
                  </div>
                  <div className="flex w-full justify-center mt-5">
                    <Button
                      as={Link}
                      color="primary"
                      href="/game-play"
                      radius="full"
                      size="md"
                      variant="ghost"
                    >
                      Play Now
                    </Button>
                  </div>
                </div>
              </div>
            </CardBody>
            <CardFooter className="absolute bottom-0 justify-center"></CardFooter>
          </Card>
        </div>

        <div className="items-center">
          <Card
            className="border-none bg-background/60 dark:bg-default-100/50 "
            isBlurred
            shadow="sm"
          >
            <CardHeader className="justify-center">
              <h1 className="text-4xl font-bold mt-2">Game Leaderboard</h1>
            </CardHeader>
            <CardBody className="w-full justify-center">
              <div className="grid md:grid-cols-12 gap-6 md:gap-4 justify-center">
                <div className="flex flex-col col-span-12 md:col-span-12">
                  <div className="flex justify-center">
                    <Table
                      aria-label="Example static collection table"
                      className="mx-auto"
                    >
                      <TableHeader>
                        <TableColumn className="text-center">
                          USERNAME
                        </TableColumn>
                        <TableColumn className="text-center">
                          TOTAL SCORE
                        </TableColumn>
                      </TableHeader>
                      <TableBody>
                        {users.map((user, index) => (
                          <TableRow key={index}>
                            <TableCell className="text-center">
                              {user.username}
                            </TableCell>
                            <TableCell className="text-center">
                              {user.total_score}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </CardBody>
            <CardFooter className="absolute bottom-0 justify-center"></CardFooter>
          </Card>
        </div>
      </div>
    </>
  )
}
