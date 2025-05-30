/* eslint-disable no-undef */
import { useEffect, useState } from 'react'
import { CiLight, CiDark } from 'react-icons/ci'

const ThemeButton = () => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const savedTheme = localStorage.getItem('theme')
      const prefersDark = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)

      setIsDark(prefersDark)
      document.documentElement.classList.toggle('dark', prefersDark)
    }
  }, [])

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)

    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      document.documentElement.classList.toggle('dark', newIsDark)
      localStorage.setItem('theme', newIsDark ? 'dark' : 'light')
    }
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label='Cambiar tema'
      className='p-2  rounded-full bg-theme-dark dark:bg-theme-light text-black dark:text-white shadow transition-colors'
    >
      {!isDark ? <CiDark size={25} className='text-accent-dark'/> : <CiLight size={25} className='text-background-dark'/>}
    </button>
  )
}

export default ThemeButton
