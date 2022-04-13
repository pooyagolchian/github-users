import { createSlice } from '@reduxjs/toolkit'
import { User } from '../interfaces/IUser'

export interface UserState {
  users: User[]
  isLoading: boolean
}

const initialUsersState: UserState = {
  users: [],
  isLoading: false,
}

const usersSlice = createSlice({
  name: 'users',
  initialState: initialUsersState,
  reducers: {
    setUsers(state: UserState, action: { payload: User[] }): void {
      state.users = action.payload
    },
    removeUser(state: UserState, action: { payload: number }): void {
      state.users.splice(
        state.users.findIndex((user: User) => user.id === action.payload),
        1
      )
    },
    setLoader(state: UserState, action: { payload: boolean }): void {
      state.isLoading = action.payload
    },
  },
})

export const usersActions = usersSlice.actions

export default usersSlice.reducer
