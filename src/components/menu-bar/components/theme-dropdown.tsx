import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { IconDeviceLaptop, IconMoon, IconSun } from '@tabler/icons-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeDropdown() {
  const [mounted, setMounted] = useState(false)
  const { theme, resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }
  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          {resolvedTheme === 'light' && theme === 'light' ? (
            <IconSun size={30} className='text-blue-400' />
          ) : resolvedTheme === 'light' ? (
            <IconSun size={30} />
          ) : resolvedTheme === 'dark' && theme === 'dark' ? (
            <IconMoon size={30} className='text-blue-300' />
          ) : resolvedTheme === 'dark' ? (
            <IconMoon size={30} />
          ) : (
            <IconDeviceLaptop size={30} />
          )}
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content>
            <DropdownMenu.Label />
            <DropdownMenu.Item />

            <ToggleGroup.Root
              type='single'
              orientation='vertical'
              value={theme}
              aria-label='Dark/Light/System Mode Selection'
              className='flex flex-col items-start w-full gap-1 pt-1 m-2 border-2 rounded-md bg-base-light dark:bg-base-dark border-base-dark dark:border-base-light'
            >
              <ToggleGroup.Item
                value='light'
                onClick={() => setTheme('light')}
                className={`flex items-center w-full gap-1 px-1 py-1 mx-0 hover:bg-hover-light dark:hover:bg-hover-dark dark:hover:text-base-dark ${
                  theme === 'light' ? 'font-bold' : 'font-normal'
                }`}
              >
                <IconSun size={30} />
                <span>Light</span>
              </ToggleGroup.Item>

              <ToggleGroup.Item
                value='dark'
                onClick={() => setTheme('dark')}
                className={`flex items-center w-full gap-1 px-1 py-1 mx-0 hover:bg-hover-light dark:hover:bg-hover-dark dark:hover:text-base-dark ${
                  theme === 'dark' ? 'font-bold' : 'font-normal'
                }`}
              >
                <IconMoon size={30} />
                <span>Dark</span>
              </ToggleGroup.Item>

              <ToggleGroup.Item
                value='system'
                onClick={() => setTheme('system')}
                className={`flex items-center w-full gap-1 px-1 py-1 mx-0 hover:bg-hover-light dark:hover:bg-hover-dark hover:text-base-dark ${
                  theme === 'system' ? 'font-bold' : 'font-normal'
                }`}
              >
                <IconDeviceLaptop size={30} />
                <span>System</span>
              </ToggleGroup.Item>
            </ToggleGroup.Root>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </>
  )
}
