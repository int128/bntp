Vue.filter 'favicon', (value) -> "url('chrome://favicon/#{value}')"

vm = new Vue
  el: 'body'
  data:
    bookmarks: []
    topSites: []
    online: window.navigator.onLine
  methods:
    demo: ->
      req = new XMLHttpRequest()
      req.open 'GET', 'demo.json', false
      req.send()
      data = JSON.parse req.response
      vm.bookmarks = groupByFolder data.bookmarks
      vm.topSites = data.topSites

chrome.topSites.get (topSites) ->
  vm.topSites = topSites

chrome.bookmarks.getTree (bookmarks) ->
  vm.bookmarks = groupByFolder bookmarks

window.addEventListener 'online',  -> vm.online = true
window.addEventListener 'offline', -> vm.online = false

groupByFolder = (bookmarks) ->
  categorize = (children) ->
    folders: children.filter (child) -> !child.url
    sites:   children.filter (child) ->  child.url
  recursive = (folder) ->
    categorized = categorize folder.children
    (if categorized.sites.length > 0
      folder.children = categorized.sites
      [folder]
    else
      []
    ).concat (categorized.folders.map recursive)...
  recursive children: bookmarks
