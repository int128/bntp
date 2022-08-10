import App from '../../src/App'

describe('<App>', () => {
  it('mounts', () => {
    // favicon API is not available on Cypress
    cy.intercept(
      {
        method: 'GET',
        pathname: '/_favicon/',
      },
      (req) => {
        const { pageUrl, size } = req.query
        req.redirect(`https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(pageUrl)}&sz=${size}`)
      }
    ).as('favicon')

    cy.viewport('macbook-11')
    cy.mount(<App />)
    cy.get('.Bookmark > a[href="http://www.google.com/"]')
    cy.wait('@favicon')
    cy.screenshot()
  })
})
