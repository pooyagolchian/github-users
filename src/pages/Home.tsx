import React from 'react'
import { useNavigate } from 'react-router-dom'
import GithubLogo from '../assets/image/github-logo.png'

export const Home = () => {
  const navigate = useNavigate()

  const handleRouteToUsersPage = async () => {
    await navigate('/users')
  }

  return (
    <div className="page-center">
      <div className="d-flex justify-content-center align-content-center flex-column">
        <img
          className="col col-12 m-0 m-auto"
          src={GithubLogo}
          alt="logo"
          data-testid="logo"
        />

        <div className="col-auto m-0 m-auto mt-3">
          <button
            className="btn btn-lg btn-outline-dark"
            onClick={handleRouteToUsersPage}
          >
            Github Users
          </button>
        </div>
      </div>
    </div>
  )
}
