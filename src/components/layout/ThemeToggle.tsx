import { SunIcon, MoonIcon } from '@radix-ui/react-icons'
import { Button, Flex, Theme } from '@radix-ui/themes'
import * as React from 'react'
import { useEffect, useState } from 'react'

export interface IThemeProps {
  onToggleTheme: (theme: "dark" | "light") => void;
}

export function ThemeToggle(props: IThemeProps) {
  const { onToggleTheme } = props;
  // Check system preference, fallback to dark
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    // whenever theme changes, call onToggleTheme
    onToggleTheme(theme)
  }, [theme])

  useEffect(() => {
    // Check if user has theme preference in localStorage
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setTheme(savedTheme as 'light' | 'dark')
      document.body.classList.toggle('dark', savedTheme === 'dark')
      return
    }

    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
      document.body.classList.add('dark')
    } else {
      setTheme('light')
      document.body.classList.remove('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
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