/* eslint-disable */
import { mockedUsersEndpoint } from '../mock/api'

describe('Github Users', () => {
  it('should go to the users page on button clicked', () => {
    mockedUsersEndpoint()
    cy.visit('/')
    cy.get('[data-testid="logo"]').should('exist')

    cy.get('.btn').should('exist')
    cy.get('.btn').click()

    cy.location('pathname').should('eq', '/users')
  })

  it('should have user profile url', () => {
    cy.get('[data-testid="user-card"] [data-testid="user-profile-link"]')
      .invoke('attr', 'href')
      .should('contain', 'https://github.com/mojombo')
  })

  it('should remove user', () => {
    const userCardElement = cy.get(
      '[data-testid="user-card"] [data-testid="delete-btn"]'
    )
    userCardElement.click()
    userCardElement.should('not.exist')

    cy.get('[data-testid="no-user-title"]').should('contain', 'NO USER!')
  })

  it('should reload data on refresh clicked', () => {
    mockedUsersEndpoint()
    cy.get('[data-testid="refresh-link"]').click()

    cy.get('[data-testid="user-card"] [data-testid="delete-btn"]').should(
      'be.visible'
    )
  })

  it('should return to home page on back clicked', () => {
    mockedUsersEndpoint()
    cy.visit('/users')
    cy.get('[data-testid="back-home-btn"]').click()

    cy.location('pathname').should('eq', '/home')
  })
})
