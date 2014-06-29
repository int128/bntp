app = angular.module 'newTabBookmarkApp', []

app.controller 'newTabBookmarkController', ($scope, $http) ->
    chrome.bookmarks.getTree (bookmarks) ->
        $scope.bookmarks = bookmarks
