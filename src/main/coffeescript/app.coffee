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
  recursive = (folder) ->
    sites      = folder.children.filter (child) ->  child.url
    subfolders = folder.children.filter (child) -> !child.url
    [title: folder.title, children: sites].concat (subfolders.map recursive)...
  recursive children: bookmarks
