describe('empty spec', () => {
  it('passes', () => {
    cy.window().then((window) => {
      window.location.href = 'chrome-extension://mkiipdhclnnejkpfpplmjmnoildlghmb/index.html'
    })
  })
})