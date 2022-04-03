export const mockedUsersEndpoint = () => {
  cy.intercept(
    {
      method: 'GET',
      url: 'https://api.github.com/users?q=addClass+user:mozilla&per_page=10',
    },
    { fixture: '../fixtures/users.json' }
  )
}
