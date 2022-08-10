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

    cy.mount(<App />)
    cy.get('.Bookmark > a[href="http://www.google.com/"]')
    // https://stackoverflow.com/questions/51246606/test-loading-of-image-in-cypress
    cy.get<HTMLImageElement>('.BookmarkButton__Icon').should((images) =>
      images.map((_, image) => expect(image.naturalWidth).to.be.greaterThan(0))
    )
    cy.screenshot()
  })
})
