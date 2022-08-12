import App from '../../src/App'
import BookmarkEditorComponent from '../../src/BookmarkEditor/component'
import { EditingBookmark } from '../../src/BookmarkEditor/model'
import { shortcutKeyOf } from '../../src/ShortcutKey/model'

const mockFaviconAPI = () =>
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
  )

describe('<App>', () => {
  it('mounts', () => {
    mockFaviconAPI().as('favicon')
    cy.mount(<App />)
    cy.get('.Bookmark > a[href="http://www.google.com/"]')
    // https://stackoverflow.com/questions/51246606/test-loading-of-image-in-cypress
    cy.get<HTMLImageElement>('.BookmarkButton__Icon').should((images) =>
      images.map((_, image) => expect(image.naturalWidth).to.be.greaterThan(0))
    )
    cy.screenshot()
  })
})

describe('<BookmarkEditor>', () => {
  it('mounts', () => {
    mockFaviconAPI().as('favicon')

    const editingBookmark = new EditingBookmark(
      {
        id: '10',
        title: 'Google',
        url: 'https://www.google.com',
        folderID: '1',
      },
      shortcutKeyOf('G')
    )
    cy.mount(
      <BookmarkEditorComponent
        editingBookmark={editingBookmark}
        onChange={() => undefined}
        onRequestClose={() => undefined}
      />
    )
    cy.get<HTMLInputElement>('.BookmarkEditor__Url').should((inputs) =>
      inputs.map((_, input) => expect(input.value).to.be.equals('https://www.google.com'))
    )
    // https://stackoverflow.com/questions/51246606/test-loading-of-image-in-cypress
    cy.get<HTMLImageElement>('.BookmarkButton__Icon').should((images) =>
      images.map((_, image) => expect(image.naturalWidth).to.be.greaterThan(0))
    )
    cy.screenshot()
  })
})
