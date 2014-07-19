app = angular.module 'newTabBookmarkApp', []

app.controller 'NewTabCtrl', ($scope, $http, flatten) ->
  chrome.bookmarks.getTree (tree) ->
    $scope.$apply ->
      $scope.folders = flatten tree
  chrome.topSites.get (topSites) ->
    $scope.$apply ->
      $scope.topSites = topSites

  $scope.demo = ->
    $http.get('demo.json').success (data) ->
      $scope.folders = flatten data.bookmarks
      $scope.topSites = data.topSites

app.factory 'categorize', ->
  (children) ->
    folders: children.filter (child) -> !child.url
    sites:   children.filter (child) ->  child.url

app.factory 'flatten', (categorize) ->
  recursive = (folder) ->
    categorized = categorize folder.children
    (if categorized.sites.length > 0
      folder.children = categorized.sites
      [folder]
    else
      []
    ).concat (categorized.folders.map recursive)...
  (tree) ->
    recursive children: tree

app.filter 'count', -> (input) ->
  input?.length
