/* eslint-disable */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import reducer, { usersActions } from '../store/users'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { Home } from '../pages/Home'
import { BrowserRouter } from 'react-router-dom'
import { MOCKED_USERS } from './mocks'
import React from 'react'
import App from '../App'

const server = setupServer(
  rest.get('/users', (req, res, ctx) => {
    return res(ctx.json(MOCKED_USERS))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Home page', () => {
  test('should return the initial state', () => {
    expect(
      reducer(undefined, {
        type: undefined,
      })
    ).toEqual({ users: [], isLoading: false })
  })

  test('should set isLoading', () => {
    const previousState = { users: [], isLoading: false }
    const expectedState = { users: [], isLoading: true }

    expect(reducer(previousState, usersActions.setLoader(true))).toEqual(
      expectedState
    )
  })

  test('should have button', async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )

    const button = screen.findByRole('button', { name: /github users/i })
    expect(button).toBeTruthy()
  })

  test('should be render image', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )

    const img = screen.findByRole('img')
    expect(img).toBeTruthy()
  })
})

describe('Users page', () => {
  test('should fetch users', async () => {
    const previousState = { users: [], isLoading: false }
    const expectedState = { users: MOCKED_USERS, isLoading: false }

    expect(reducer(previousState, usersActions.setUsers(MOCKED_USERS))).toEqual(
      expectedState
    )
  })

  test('should remove user', () => {
    const previousState = { users: MOCKED_USERS, isLoading: false }
    const expectedState = { users: [], isLoading: false }

    expect(reducer(previousState, usersActions.removeUser(1))).toEqual(
      expectedState
    )
  })

  test('should have image', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    const firstImage = screen.findByRole('img', { name: /mdq6vxnlcje=/i })
    expect(firstImage).toBeTruthy()
  })

  test('should have image', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    const firstImage = screen.findByRole('img', { name: /mdq6vxnlcje=/i })
    expect(firstImage).toBeTruthy()
  })

  test('should have username', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    const username = screen.findByRole(/mojombo/i)
    expect(username).toBeTruthy()
  })
})
