'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/auth/auth'
import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import SunIcon from './SunIcon'
import MoonIcon from './MoonIcon'
import { useAuth } from '../context/AuthContext'

export default function NavbarSect({ home, gameList, userList }) {
  const [mounted, setMounted] = useState(false)
  const { setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const auth = useAuth()
  const username = localStorage.getItem('currentUserUsername')
  const selectIsLogin = (state) => state.auth.isLogin;
  const isLogin = useSelector(selectIsLogin);
  const dispatch = useDispatch()
  const router = useRouter()

  const logoutHandler = () => {
    auth.logout()
    dispatch(logout())
    router.push('/')
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }
  const menuItemsLogin = [
    { menu: 'Homepage', link: 'home' },
    { menu: 'Game List', link: 'game-list' },
    { menu: 'User List', link: 'user-list' },
    'Logout',
  ]

  return (
    <Navbar maxWidth="2xl" onMenuOpenChange={setIsMenuOpen} position="static">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/">
            <Image
              alt="logo.png"
              height={24}
              src="/images/logo.png"
              width={24}
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>
      {isLogin && (
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <h3>Welcome!</h3>
          <NavbarItem isActive={home}>
            <Link href="home">Homepage</Link>
          </NavbarItem>
          <NavbarItem isActive={gameList}>
            <Link aria-current="page" href="game-list">
              Game List
            </Link>
          </NavbarItem>
          <NavbarItem isActive={userList}>
            <Link href="user-list">User List</Link>
          </NavbarItem>
        </NavbarContent>
      )}
      <NavbarContent justify="end">
        {!isLogin && (
          <>
            <NavbarItem>
              <Button
                as={Link}
                color="primary"
                href="/register"
                variant="ghost"
              >
                Sign Up
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="/login" variant="shadow">
                Sign In
              </Button>
            </NavbarItem>
          </>
        )}
        {isLogin && (
          <>
            <NavbarItem>
              <Link href="profile">{username}</Link>
            </NavbarItem>
            <NavbarItem>
              <Button color="primary" onClick={logoutHandler} variant="ghost">
                Logout
              </Button>
            </NavbarItem>
          </>
        )}
        <NavbarItem>
          <Button
            isIconOnly
            onClick={() => setTheme('light')}
            variant="primary"
          >
            <SunIcon />
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button isIconOnly onClick={() => setTheme('dark')}  variant="outline">
            <MoonIcon />
          </Button>
        </NavbarItem>
      </NavbarContent>
      {isLogin ? (
        <NavbarMenu>
          {menuItemsLogin.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                color={index === 1 ? 'danger' : 'primary'}
                href={item.link}
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
          <NavbarMenuItem>
            <Button color="primary" onClick={logoutHandler} variant="ghost">
              Logout
            </Button>
          </NavbarMenuItem>
        </NavbarMenu>
      ) : (
        <NavbarMenu>
          <NavbarMenuItem>
            <Button as={Link} color="primary" href="/register" variant="ghost">
              Sign Up
            </Button>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Button as={Link} color="primary" href="/login" variant="shadow">
              Sign In
            </Button>
          </NavbarMenuItem>
        </NavbarMenu>
      )}
    </Navbar>
  )
}
