var App = angular.module('ngApp', ['ngAnimate','ngSanitize']);
App.controller('index', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {
    
$scope.msg = "Ready 👌"


function formatline(line) {
    if (line.startsWith("###"))
    {
        return {class:"h1",text:line.substring(3)};
    } else if (line.startsWith("##")) {
        return {class:"h2",text:line.substring(2)};
    } else if (line.startsWith("#")) {
        return {class:"h3",icon:line.split(" ")[0].substring(1),text:line.substring(line.indexOf(" ") + 1)};
    } else if (line.startsWith("&")) {
        return {class:"a",link:line.substring(1).split('|')[1],text:line.substring(1).split('|')[0]};
    } else if (line.startsWith("%%%%")) {
        return {class:"social"};
    }
    else {
        return {class:"p",text:line};

    }
}
$scope.lines = []

$scope.loadData = function() {
    $http({
        method: 'GET',
        url: 'https://script.googleusercontent.com/macros/echo?user_content_key=bmRzNKwZ2nYLli8oC0LLHdXIhOfAchv26o3k3P1c3OrQ1IngIa_mQ7nAJVEBQs4bLIJNIdhq7Jfz_3BAFFfalRZwAh5M7iDpm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnPJkf0ytZnAL9VnPmfP1BO2_EfVvdJ0XT-sPndOne_8RroeMBrOnfMUf0vohAwkQatSlLeB0lboZ&lib=MzeL2Tb9wfGYIxPMdIqjRo32r9Ni28gqL'
      }).then(function successCallback(response) {
        // Handle all rows

        $scope.allLines = response.data.data.split("\n").filter(Boolean);
        $scope.allLines.forEach(element => {
            $scope.lines.push(formatline(element))
        });
      
      
 
      
    $scope.isPageLoaded = true;

          // this callback will be called asynchronously
          // when the response is available
        }, function errorCallback(response) {
            console.log('err!')
            console.log(response)
    
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
    
}

$scope.loadData();



}]);