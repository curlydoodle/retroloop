import { fireEvent, render, screen } from '@testing-library/react'
import { signOut } from 'next-auth/react'
import { beforeAll, describe, expect, test, vi } from 'vitest'

import { UserDropdown } from '@/components/menu-bar/components/user-dropdown/user-dropdown'

vi.mock('next-auth/react', () => ({
  signOut: vi.fn(),
  useSession: vi.fn(),
}))

test('UserDropdown', () => {
  describe('UserDropdown', () => {
    let useSessionMock

    beforeAll(() => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      useSessionMock = vi.spyOn(require('next-auth/react'), 'useSession')
      useSessionMock.mockReturnValue({ data: { session: { user: { name: 'John Doe' } } } })

      render(<UserDropdown />)
    })

    test('renders dropdown menu', () => {
      const triggerElement = screen.getByRole('button', { name: '' })
      expect(triggerElement).toBeDefined()

      const portalElement = screen.getByRole('region', { name: 'RadixDropdownMenuPortal' })
      expect(portalElement).toBeDefined()
    })

    test('renders user information and logout button', () => {
      const userInfoElement = screen.getByText(/Logged in as/i)
      expect(userInfoElement).toBeDefined()

      const userNameElement = screen.getByText(/John Doe/i)
      expect(userNameElement).toBeDefined()

      const logoutButton = screen.getByRole('button', { name: 'Logout' })
      expect(logoutButton).toBeDefined()
    })

    test('calls signOut function when logout button is clicked', () => {
      const logoutButton = screen.getByRole('button', { name: 'Logout' })
      expect(logoutButton).toBeDefined()

      fireEvent.click(logoutButton)
      expect(signOut).toHaveBeenCalled()
    })
  })
})
