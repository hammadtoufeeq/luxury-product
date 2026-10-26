import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import Login from './Login'
import api from '../api/axios.js'

jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: { success: jest.fn(), error: jest.fn() },
}))

function renderLogin() {
  const setIsLoggedIn = jest.fn()
  const setuser = jest.fn()
  render(
    <AuthContext.Provider value={{ setIsLoggedIn, setuser }}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </AuthContext.Provider>
  )
  return { setIsLoggedIn, setuser }
}

test('renders email and password fields', () => {
  renderLogin()
  expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument()
  expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument()
})

test('logs in with the typed email and password', async () => {
  api.post.mockResolvedValue({ data: { user: { name: 'Hammad' } } })
  const { setIsLoggedIn, setuser } = renderLogin()
  const user = userEvent.setup()

  await user.type(screen.getByPlaceholderText('Enter your email'), 'a@b.com')
  await user.type(screen.getByPlaceholderText('Enter your password'), '123456')
  await user.click(screen.getByRole('button', { name: 'Login' }))

  expect(api.post).toHaveBeenCalledWith('/users/login', {
    email: 'a@b.com',
    password: '123456',
  })
  expect(setIsLoggedIn).toHaveBeenCalledWith(true)
  expect(setuser).toHaveBeenCalledWith({ name: 'Hammad' })
})