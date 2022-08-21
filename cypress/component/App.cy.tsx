import { mockChromeAPI, mockFaviconAPI } from '../support/chrome'
import App from '../../src/App/component'

beforeEach(() => {
  mockChromeAPI()
  mockFaviconAPI()

  // clear datas such as color scheme to avoid side effect
  for (const key in document.documentElement.dataset) {
    delete document.documentElement.dataset[key]
  }
})

describe('<App>', () => {
  it('mounts', () => {
    cy.mount(<App />)
    cy.get('.Bookmark > a[href="http://www.google.com/"]')
    // https://stackoverflow.com/questions/51246606/test-loading-of-image-in-cypress
    cy.get<HTMLImageElement>('.BookmarkButton__Icon').should((images) =>
      images.map((_, image) => expect(image.naturalWidth).to.be.greaterThan(0))
    )
    cy.screenshot()
  })

  it('enables dark mode', () => {
    cy.mount(<App />)
    cy.get('.Bookmark > a[href="http://www.google.com/"]')
    cy.get('input[name="selectedColorScheme"]').check('dark').should('be.checked')
    cy.screenshot()
  })

  it('opens the bookmark editor', () => {
    cy.mount(<App />)
    cy.get('.Bookmark > a[href="http://www.google.com/"] ~ a[href="#Edit"]').click({ force: true })
    cy.screenshot()
  })
})
