app = angular.module 'newTabBookmarkApp', []

app.controller 'NewTabCtrl', ($scope) ->
    chrome.bookmarks.getTree (tree) ->
        $scope.$apply ->
            $scope.tree = tree
    chrome.topSites.get (topSites) ->
        $scope.$apply ->
            $scope.topSites = topSites

app.filter 'folders', -> (input) ->
    input?.filter (item) -> item.url == undefined

app.filter 'bookmarks', -> (input) ->
    input?.filter (item) -> item.url != undefined

app.filter 'count', -> (input) ->
    input?.length

