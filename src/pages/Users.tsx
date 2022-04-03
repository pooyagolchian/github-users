import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { usersActions } from '../store/users'
import UsersService from '../services/UsersService'
import { UserCard } from '../components/UserCard'
import { SVGLoader } from '../components/SVGLoader'
import { User } from '../interfaces/IUser'
import { RootState } from '../store'

export const Users = () => {
  const navigate = useNavigate()
  const users: User[] = useSelector((state: RootState) => state?.users.users)
  const isLoading: boolean = useSelector(
    (state: RootState) => state?.users.isLoading
  )
  const dispatch = useDispatch()

  useEffect(() => {
    const getUsers = async () => {
      await dispatch(usersActions.setLoader(true))
      const response = await UsersService.FetchGithubUsers()
      await dispatch(usersActions.setUsers(response?.data))
      await dispatch(usersActions.setLoader(false))
    }

    getUsers().catch((e) => {
      console.error(e)
    })
  }, [dispatch])

  const handleRouteToHomePage = () => {
    navigate('/home')
  }

  const handleRefresh = () => {
    window.location.reload()
  }

  if (isLoading) {
    return (
      <div className="page-center">
        <SVGLoader />
      </div>
    )
  }

  if ((!users || Object.keys(users).length === 0) && !isLoading) {
    return (
      <div className="page-center flex-column">
        <div className="fs-2" data-testid="no-user-title">
          NO USER! <i className="lnr lnr-users" />
        </div>

        <div className="cursor-pointer mb-3 fs-4" onClick={handleRefresh}>
          <i className="lnr lnr-redo" data-testid="refresh-link" /> Refresh
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="col col-12 px-5 py-5">
        <div
          data-testid="back-home-btn"
          className="cursor-pointer mb-3 fs-4"
          onClick={handleRouteToHomePage}
        >
          <i className="lnr lnr-arrow-left" /> Back to home
        </div>

        <UserCard users={users} />
      </div>
    </div>
  )
}
