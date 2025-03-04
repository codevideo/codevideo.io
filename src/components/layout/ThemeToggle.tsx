import { SunIcon, MoonIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import * as React from 'react'
import { useEffect } from 'react'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { setTheme } from '../../store/editorSlice'

export function ThemeToggle() {
  const { theme } = useAppSelector((state) => state.editor)
  const dispatch = useAppDispatch();

  // Check system preference, fallback to dark
  useEffect(() => {
    // Check if user has theme preference in localStorage
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      dispatch(setTheme(savedTheme as 'light' | 'dark'))
      document.body.classList.toggle('dark', savedTheme === 'dark')
      return
    }

    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      dispatch(setTheme('dark'))
      document.body.classList.add('dark')
    } else {
      dispatch(setTheme('light'))
      document.body.classList.remove('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    dispatch(setTheme(newTheme))
    document.body.classList.toggle('dark')
    localStorage.setItem('theme', newTheme)
  }

  return (
    <Button
      variant="ghost" 
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </Button>
  )
}