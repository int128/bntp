app = angular.module 'newTabBookmarkApp', []

app.controller 'NewTabCtrl', ($scope, $http) ->
  chrome.bookmarks.getTree (tree) ->
    $scope.$apply ->
      $scope.tree = tree
  chrome.topSites.get (topSites) ->
    $scope.$apply ->
      $scope.topSites = topSites

  $scope.demo = ->
    $http.get('demo.json').success (data) ->
      $scope.tree = data.bookmarks
      $scope.topSites = data.topSites

app.filter 'folders', -> (input) ->
  input?.filter (item) -> item.url == undefined

app.filter 'bookmarks', -> (input) ->
  input?.filter (item) -> item.url != undefined

app.filter 'count', -> (input) ->
  input?.length
